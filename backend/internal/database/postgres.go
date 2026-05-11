package database

import (
	"context"
	"fmt"
	"time"

	"github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/config"
	"github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

func Open(cfg config.Config) (*gorm.DB, error) {
	db, err := gorm.Open(
		postgres.Open(cfg.DatabaseURL),
		&gorm.Config{
			Logger: gormlogger.Default.LogMode(gormlogger.Warn),
		},
	)
	if err != nil {
		return nil, fmt.Errorf("open postgres connection: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("get sql db handle: %w", err)
	}

	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetConnMaxLifetime(30 * time.Minute)
	sqlDB.SetConnMaxIdleTime(5 * time.Minute)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := sqlDB.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("ping postgres: %w", err)
	}

	if err := db.AutoMigrate(
		&models.User{},
		&models.Design{},
		&models.Order{},
		&models.Measurement{},
	); err != nil {
		return nil, fmt.Errorf("auto-migrate schema: %w", err)
	}

	return db, nil
}
