package server

import (
	"crypto/subtle"
	"log/slog"
	"net/http"
	"strings"
	"time"
)

type statusRecorder struct {
	http.ResponseWriter
	statusCode int
}

func (r *statusRecorder) WriteHeader(statusCode int) {
	r.statusCode = statusCode
	r.ResponseWriter.WriteHeader(statusCode)
}

func (s *Server) requestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		recorder := &statusRecorder{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		start := time.Now()
		next.ServeHTTP(recorder, r)

		s.logger.Info(
			"http request",
			slog.String("method", r.Method),
			slog.String("path", r.URL.Path),
			slog.Int("status", recorder.statusCode),
			slog.Duration("duration", time.Since(start)),
		)
	})
}

func (s *Server) securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Prevent MIME type sniffing
		w.Header().Set("X-Content-Type-Options", "nosniff")

		// Prevent clickjacking attacks
		w.Header().Set("X-Frame-Options", "DENY")

		// Enable XSS protection
		w.Header().Set("X-XSS-Protection", "1; mode=block")

		// Referrer policy
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

		// Content Security Policy
		w.Header().Set("Content-Security-Policy", "default-src 'self'")

		// HSTS (enabled only in production)
		if s.cfg.AppEnv == "production" {
			w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		}

		next.ServeHTTP(w, r)
	})
}

func (s *Server) cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := strings.TrimSpace(r.Header.Get("Origin"))
		allowedOrigin, ok := s.allowedOrigin(origin)
		if ok {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Admin-Key")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
			w.Header().Set("Access-Control-Max-Age", "3600")
			w.Header().Set("Access-Control-Allow-Credentials", "false")
		}

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (s *Server) withAdmin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if s.cfg.AdminAPIKey == "" {
			s.logger.Warn("admin access attempted without api key configured", slog.String("remote_addr", r.RemoteAddr))
			writeError(w, http.StatusUnauthorized, "admin access denied", nil)
			return
		}

		provided := strings.TrimSpace(r.Header.Get("X-Admin-Key"))
		if provided == "" {
			s.logger.Warn("admin access attempted without credentials", slog.String("remote_addr", r.RemoteAddr))
			writeError(w, http.StatusUnauthorized, "admin access denied", nil)
			return
		}

		// Use constant-time comparison to prevent timing attacks
		if subtle.ConstantTimeCompare([]byte(provided), []byte(s.cfg.AdminAPIKey)) != 1 {
			s.logger.Warn("admin access denied - invalid credentials", slog.String("remote_addr", r.RemoteAddr))
			writeError(w, http.StatusUnauthorized, "admin access denied", nil)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (s *Server) allowedOrigin(origin string) (string, bool) {
	if origin == "" {
		return "", false
	}

	for _, allowed := range s.cfg.AllowedOrigins {
		// Security: Don't allow wildcard CORS in production
		if allowed == "*" {
			if s.cfg.AppEnv != "development" {
				s.logger.Warn("wildcard cors origin not allowed in production",
					slog.String("origin", origin),
					slog.String("env", s.cfg.AppEnv))
				continue
			}
			s.logger.Warn("wildcard cors origin used - only for development",
				slog.String("origin", origin))
			return "*", true
		}

		if strings.EqualFold(allowed, origin) {
			return origin, true
		}
	}

	return "", false
}
