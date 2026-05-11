package server

import (
	"crypto/rand"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/models"
	"gorm.io/gorm"
)

type uploadResponse struct {
	FileName string `json:"file_name"`
	URL      string `json:"url"`
}

type publicOrderResponse struct {
	ID              uint               `json:"id"`
	TrackingCode    string             `json:"tracking_code"`
	Status          models.OrderStatus `json:"status"`
	SelectedDesign  *models.Design     `json:"selected_design,omitempty"`
	CustomDesignURL string             `json:"custom_design_url,omitempty"`
	Notes           string             `json:"notes,omitempty"`
	Measurement     models.Measurement `json:"measurement"`
	CreatedAt       time.Time          `json:"created_at"`
	UpdatedAt       time.Time          `json:"updated_at"`
}

type dashboardSummaryResponse struct {
	TotalOrders  int64                        `json:"total_orders"`
	RecentOrders int64                        `json:"recent_orders"`
	ByStatus     map[models.OrderStatus]int64 `json:"by_status"`
}

func (s *Server) health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"status":  "ok",
		"service": "habsha-kamiss-backend",
		"time":    time.Now().UTC(),
	})
}

func (s *Server) listDesigns(w http.ResponseWriter, r *http.Request) {
	designs := []models.Design{}
	if err := s.db.WithContext(r.Context()).
		Where("is_active = ?", true).
		Order("created_at DESC").
		Find(&designs).Error; err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list designs", err)
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"items": designs,
	})
}

func (s *Server) uploadDesign(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, s.cfg.MaxUploadSizeBytes)
	if err := r.ParseMultipartForm(s.cfg.MaxUploadSizeBytes); err != nil {
		writeError(w, http.StatusBadRequest, "failed to parse upload", err)
		return
	}

	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		writeError(w, http.StatusBadRequest, "file field is required", err)
		return
	}
	defer file.Close()

	extension, err := validateImageFile(file, fileHeader)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid upload", err)
		return
	}

	fileName, err := randomFileName(extension)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to generate file name", err)
		return
	}

	relativePath := filepath.Join("designs", fileName)
	absolutePath := filepath.Join(s.uploadDir, relativePath)

	destination, err := os.Create(absolutePath)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create upload file", err)
		return
	}
	defer destination.Close()

	if _, err := io.Copy(destination, file); err != nil {
		writeError(w, http.StatusInternalServerError, "failed to save upload file", err)
		return
	}

	writeJSON(w, http.StatusCreated, uploadResponse{
		FileName: fileName,
		URL:      "/uploads/" + filepath.ToSlash(relativePath),
	})
}

func (s *Server) createOrder(w http.ResponseWriter, r *http.Request) {
	var req createOrderRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body", err)
		return
	}

	if err := req.validate(); err != nil {
		writeError(w, http.StatusBadRequest, "validation failed", err)
		return
	}

	measurementUnit, _ := normalizeMeasurementUnit(req.Measurement.Unit)

	var createdOrder models.Order
	err := s.db.WithContext(r.Context()).Transaction(func(tx *gorm.DB) error {
		if req.SelectedDesignID != nil {
			var design models.Design
			if err := tx.First(&design, *req.SelectedDesignID).Error; err != nil {
				if errors.Is(err, gorm.ErrRecordNotFound) {
					return fmt.Errorf("selected design not found")
				}

				return fmt.Errorf("check selected design: %w", err)
			}
		}

		user, err := upsertCustomer(tx, req.Customer)
		if err != nil {
			return err
		}

		trackingCode, err := newTrackingCode()
		if err != nil {
			return err
		}

		order := models.Order{
			TrackingCode:     trackingCode,
			UserID:           user.ID,
			Status:           models.OrderStatusReceived,
			SelectedDesignID: req.SelectedDesignID,
			CustomDesignURL:  strings.TrimSpace(req.CustomDesignURL),
			Notes:            strings.TrimSpace(req.Notes),
		}

		if err := tx.Create(&order).Error; err != nil {
			return fmt.Errorf("create order: %w", err)
		}

		measurement := models.Measurement{
			OrderID:                  order.ID,
			Unit:                     measurementUnit,
			StomachWidth:             req.Measurement.StomachWidth,
			ShoulderWidth:            req.Measurement.ShoulderWidth,
			FrontLegToShoulderLength: req.Measurement.FrontLegToShoulderLength,
			HandWidth:                req.Measurement.HandWidth,
			LegWidth:                 req.Measurement.LegWidth,
			AdditionalNotes:          strings.TrimSpace(req.Measurement.AdditionalNotes),
		}

		if err := tx.Create(&measurement).Error; err != nil {
			return fmt.Errorf("create measurement: %w", err)
		}

		if err := tx.Preload("User").
			Preload("Measurement").
			Preload("SelectedDesign").
			First(&createdOrder, order.ID).Error; err != nil {
			return fmt.Errorf("reload created order: %w", err)
		}

		return nil
	})
	if err != nil {
		status := http.StatusInternalServerError
		if err.Error() == "selected design not found" {
			status = http.StatusBadRequest
		}

		writeError(w, status, "failed to create order", err)
		return
	}

	writeJSON(w, http.StatusCreated, createdOrder)
}

func (s *Server) getTrackedOrder(w http.ResponseWriter, r *http.Request) {
	trackingCode := strings.TrimSpace(r.PathValue("trackingCode"))
	if trackingCode == "" {
		writeError(w, http.StatusBadRequest, "tracking code is required", nil)
		return
	}

	var order models.Order
	err := s.db.WithContext(r.Context()).
		Preload("Measurement").
		Preload("SelectedDesign").
		Where("tracking_code = ?", trackingCode).
		First(&order).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			writeError(w, http.StatusNotFound, "order not found", nil)
			return
		}

		writeError(w, http.StatusInternalServerError, "failed to fetch order", err)
		return
	}

	writeJSON(w, http.StatusOK, publicOrderResponse{
		ID:              order.ID,
		TrackingCode:    order.TrackingCode,
		Status:          order.Status,
		SelectedDesign:  order.SelectedDesign,
		CustomDesignURL: order.CustomDesignURL,
		Notes:           order.Notes,
		Measurement:     order.Measurement,
		CreatedAt:       order.CreatedAt,
		UpdatedAt:       order.UpdatedAt,
	})
}

func (s *Server) listAdminOrders(w http.ResponseWriter, r *http.Request) {
	limit, err := parseLimit(r.URL.Query().Get("limit"), 25, 100)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid limit", err)
		return
	}

	query := s.db.WithContext(r.Context()).
		Preload("User").
		Preload("Measurement").
		Preload("SelectedDesign").
		Order("created_at DESC").
		Limit(limit)

	if rawStatus := strings.TrimSpace(r.URL.Query().Get("status")); rawStatus != "" {
		status, err := models.ParseOrderStatus(rawStatus)
		if err != nil {
			writeError(w, http.StatusBadRequest, "invalid status filter", err)
			return
		}

		query = query.Where("status = ?", status)
	}

	orders := []models.Order{}
	if err := query.Find(&orders).Error; err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list admin orders", err)
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"items": orders,
	})
}

func (s *Server) getAdminOrder(w http.ResponseWriter, r *http.Request) {
	id, err := parseUint(r.PathValue("id"))
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid order id", err)
		return
	}

	var order models.Order
	err = s.db.WithContext(r.Context()).
		Preload("User").
		Preload("Measurement").
		Preload("SelectedDesign").
		First(&order, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			writeError(w, http.StatusNotFound, "order not found", nil)
			return
		}

		writeError(w, http.StatusInternalServerError, "failed to fetch order", err)
		return
	}

	writeJSON(w, http.StatusOK, order)
}

func (s *Server) updateAdminOrderStatus(w http.ResponseWriter, r *http.Request) {
	id, err := parseUint(r.PathValue("id"))
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid order id", err)
		return
	}

	var req updateOrderStatusRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body", err)
		return
	}

	status, err := req.validate()
	if err != nil {
		writeError(w, http.StatusBadRequest, "validation failed", err)
		return
	}

	var order models.Order
	err = s.db.WithContext(r.Context()).Transaction(func(tx *gorm.DB) error {
		if err := tx.First(&order, id).Error; err != nil {
			return err
		}

		order.Status = status
		order.AdminNotes = strings.TrimSpace(req.AdminNotes)

		if err := tx.Save(&order).Error; err != nil {
			return fmt.Errorf("update order status: %w", err)
		}

		if err := tx.Preload("User").
			Preload("Measurement").
			Preload("SelectedDesign").
			First(&order, id).Error; err != nil {
			return fmt.Errorf("reload updated order: %w", err)
		}

		return nil
	})
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			writeError(w, http.StatusNotFound, "order not found", nil)
			return
		}

		writeError(w, http.StatusInternalServerError, "failed to update order", err)
		return
	}

	writeJSON(w, http.StatusOK, order)
}

func (s *Server) getAdminDashboardSummary(w http.ResponseWriter, r *http.Request) {
	var totalOrders int64
	if err := s.db.WithContext(r.Context()).Model(&models.Order{}).Count(&totalOrders).Error; err != nil {
		writeError(w, http.StatusInternalServerError, "failed to count orders", err)
		return
	}

	var recentOrders int64
	if err := s.db.WithContext(r.Context()).
		Model(&models.Order{}).
		Where("created_at >= ?", time.Now().Add(-7*24*time.Hour)).
		Count(&recentOrders).Error; err != nil {
		writeError(w, http.StatusInternalServerError, "failed to count recent orders", err)
		return
	}

	type groupedCount struct {
		Status models.OrderStatus
		Total  int64
	}

	grouped := []groupedCount{}
	if err := s.db.WithContext(r.Context()).
		Model(&models.Order{}).
		Select("status, COUNT(*) as total").
		Group("status").
		Scan(&grouped).Error; err != nil {
		writeError(w, http.StatusInternalServerError, "failed to build dashboard summary", err)
		return
	}

	byStatus := map[models.OrderStatus]int64{
		models.OrderStatusReceived:         0,
		models.OrderStatusAccepted:         0,
		models.OrderStatusCallingCustomer:  0,
		models.OrderStatusInProduction:     0,
		models.OrderStatusReadyForDelivery: 0,
		models.OrderStatusDelivered:        0,
		models.OrderStatusRejected:         0,
	}

	for _, item := range grouped {
		byStatus[item.Status] = item.Total
	}

	writeJSON(w, http.StatusOK, dashboardSummaryResponse{
		TotalOrders:  totalOrders,
		RecentOrders: recentOrders,
		ByStatus:     byStatus,
	})
}

func upsertCustomer(tx *gorm.DB, input customerInput) (models.User, error) {
	phoneNumber := strings.TrimSpace(input.PhoneNumber)

	var user models.User
	err := tx.Where("phone_number = ?", phoneNumber).First(&user).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return models.User{}, fmt.Errorf("lookup customer: %w", err)
		}

		user = models.User{
			FullName:    strings.TrimSpace(input.FullName),
			Email:       strings.TrimSpace(input.Email),
			PhoneNumber: phoneNumber,
			Address:     strings.TrimSpace(input.Address),
		}

		if err := tx.Create(&user).Error; err != nil {
			return models.User{}, fmt.Errorf("create customer: %w", err)
		}

		return user, nil
	}

	user.FullName = strings.TrimSpace(input.FullName)
	user.Email = strings.TrimSpace(input.Email)
	user.Address = strings.TrimSpace(input.Address)

	if err := tx.Save(&user).Error; err != nil {
		return models.User{}, fmt.Errorf("update customer: %w", err)
	}

	return user, nil
}

func validateImageFile(file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	extension := strings.ToLower(filepath.Ext(fileHeader.Filename))
	switch extension {
	case ".jpg", ".jpeg", ".png", ".webp":
	default:
		return "", fmt.Errorf("only .jpg, .jpeg, .png, and .webp files are allowed")
	}

	buffer := make([]byte, 512)
	n, err := file.Read(buffer)
	if err != nil && !errors.Is(err, io.EOF) {
		return "", fmt.Errorf("read upload: %w", err)
	}

	contentType := http.DetectContentType(buffer[:n])
	if !strings.HasPrefix(contentType, "image/") {
		return "", fmt.Errorf("uploaded file must be an image")
	}

	if _, err := file.Seek(0, io.SeekStart); err != nil {
		return "", fmt.Errorf("rewind upload: %w", err)
	}

	return extension, nil
}

func randomFileName(extension string) (string, error) {
	randomBytes := make([]byte, 8)
	if _, err := rand.Read(randomBytes); err != nil {
		return "", fmt.Errorf("generate file name: %w", err)
	}

	return strings.ToLower(fmt.Sprintf("%x%s", randomBytes, extension)), nil
}
