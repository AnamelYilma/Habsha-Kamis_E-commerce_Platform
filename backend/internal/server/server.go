package server

import (
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"

	"github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/config"
	"gorm.io/gorm"
)

type Server struct {
	cfg       config.Config
	db        *gorm.DB
	logger    *slog.Logger
	uploadDir string
}

func New(cfg config.Config, db *gorm.DB, logger *slog.Logger) (*Server, error) {
	uploadDir := filepath.Clean(cfg.UploadDir)
	if err := os.MkdirAll(filepath.Join(uploadDir, "designs"), 0o755); err != nil {
		return nil, fmt.Errorf("create upload directories: %w", err)
	}

	return &Server{
		cfg:       cfg,
		db:        db,
		logger:    logger,
		uploadDir: uploadDir,
	}, nil
}

func (s *Server) Routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", s.health)
	mux.HandleFunc("GET /api/v1/designs", s.listDesigns)
	mux.HandleFunc("POST /api/v1/orders", s.createOrder)
	mux.HandleFunc("GET /api/v1/orders/track/{trackingCode}", s.getTrackedOrder)
	mux.HandleFunc("POST /api/v1/uploads/design", s.uploadDesign)

	mux.Handle(
		"GET /uploads/",
		http.StripPrefix("/uploads/", http.FileServer(http.Dir(s.uploadDir))),
	)

	mux.Handle(
		"GET /api/v1/admin/orders",
		s.withAdmin(http.HandlerFunc(s.listAdminOrders)),
	)
	mux.Handle(
		"GET /api/v1/admin/orders/{id}",
		s.withAdmin(http.HandlerFunc(s.getAdminOrder)),
	)
	mux.Handle(
		"PATCH /api/v1/admin/orders/{id}/status",
		s.withAdmin(http.HandlerFunc(s.updateAdminOrderStatus)),
	)
	mux.Handle(
		"GET /api/v1/admin/dashboard/summary",
		s.withAdmin(http.HandlerFunc(s.getAdminDashboardSummary)),
	)

	return s.securityHeaders(s.cors(s.requestLogger(mux)))
}
