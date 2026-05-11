package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	AppEnv             string
	Port               string
	DatabaseURL        string
	UploadDir          string
	MaxUploadSizeBytes int64
	AdminAPIKey        string
	AllowedOrigins     []string
}

func Load() (Config, error) {
	maxUploadMB, err := int64Env("MAX_UPLOAD_SIZE_MB", 10)
	if err != nil {
		return Config{}, err
	}

	cfg := Config{
		AppEnv:             envOrDefault("APP_ENV", "development"),
		Port:               envOrDefault("PORT", "8080"),
		DatabaseURL:        strings.TrimSpace(os.Getenv("DATABASE_URL")),
		UploadDir:          envOrDefault("UPLOAD_DIR", "uploads"),
		MaxUploadSizeBytes: maxUploadMB * 1024 * 1024,
		AdminAPIKey:        strings.TrimSpace(os.Getenv("ADMIN_API_KEY")),
		AllowedOrigins:     splitCSV(envOrDefault("CORS_ALLOWED_ORIGINS", "http://localhost:5173")),
	}

	if cfg.DatabaseURL == "" {
		return Config{}, fmt.Errorf("DATABASE_URL is required")
	}

	return cfg, nil
}

func (c Config) ListenAddr() string {
	if strings.HasPrefix(c.Port, ":") {
		return c.Port
	}

	return ":" + c.Port
}

func envOrDefault(key string, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}

	return value
}

func int64Env(key string, fallback int64) (int64, error) {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback, nil
	}

	parsed, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		return 0, fmt.Errorf("invalid %s: %w", key, err)
	}

	if parsed <= 0 {
		return 0, fmt.Errorf("%s must be greater than zero", key)
	}

	return parsed, nil
}

func splitCSV(value string) []string {
	parts := strings.Split(value, ",")
	origins := make([]string, 0, len(parts))

	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed == "" {
			continue
		}

		origins = append(origins, trimmed)
	}

	if len(origins) == 0 {
		return []string{"http://localhost:5173"}
	}

	return origins
}
