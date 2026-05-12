package main

import (
    "context"
    "errors"
    "log/slog"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/joho/godotenv" // 1. Add this import
    "github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/config"
    "github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/database"
    "github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/server"
)

func main() {
    // 2. Add this block to read your .env file
    if err := godotenv.Load(); err != nil {
        slog.Warn("No .env file found, using system environment variables")
    }

    cfg, err := config.Load()
    if err != nil {
        slog.Error("loading config", "error", err)
        os.Exit(1)
    }
    

	logger := slog.New(
		slog.NewJSONHandler(
			os.Stdout,
			&slog.HandlerOptions{Level: slog.LevelInfo},
		),
	)

	db, err := database.Open(cfg)
	if err != nil {
		logger.Error("opening database", "error", err)
		os.Exit(1)
	}

	apiServer, err := server.New(cfg, db, logger)
	if err != nil {
		logger.Error("building server", "error", err)
		os.Exit(1)
	}

	httpServer := &http.Server{
		Addr:              cfg.ListenAddr(),
		Handler:           apiServer.Routes(),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	shutdownCtx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stop()

	go func() {
		<-shutdownCtx.Done()

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := httpServer.Shutdown(ctx); err != nil {
			logger.Error("shutting down server", "error", err)
		}
	}()

	logger.Info(
		"starting habsha kamiss backend",
		"addr",
		httpServer.Addr,
		"env",
		cfg.AppEnv,
	)

	err = httpServer.ListenAndServe()
	if err != nil && !errors.Is(err, http.ErrServerClosed) {
		logger.Error("server stopped unexpectedly", "error", err)
		os.Exit(1)
	}
}
