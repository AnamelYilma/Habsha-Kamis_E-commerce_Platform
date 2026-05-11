package server

import (
	"fmt"
	"net/mail"
	"net/url"
	"strings"

	"github.com/AnamelYilma/Habsha-Kamis_E-commerce_Platform/backend/internal/models"
)

const maxMeasurementValue = 400

type createOrderRequest struct {
	Customer         customerInput    `json:"customer"`
	Measurement      measurementInput `json:"measurement"`
	SelectedDesignID *uint            `json:"selected_design_id,omitempty"`
	CustomDesignURL  string           `json:"custom_design_url,omitempty"`
	Notes            string           `json:"notes,omitempty"`
}

type customerInput struct {
	FullName    string `json:"full_name"`
	Email       string `json:"email,omitempty"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
}

type measurementInput struct {
	Unit                     string  `json:"unit,omitempty"`
	StomachWidth             float64 `json:"stomach_width"`
	ShoulderWidth            float64 `json:"shoulder_width"`
	FrontLegToShoulderLength float64 `json:"front_leg_to_shoulder_length"`
	HandWidth                float64 `json:"hand_width"`
	LegWidth                 float64 `json:"leg_width"`
	AdditionalNotes          string  `json:"additional_notes,omitempty"`
}

type updateOrderStatusRequest struct {
	Status     string `json:"status"`
	AdminNotes string `json:"admin_notes,omitempty"`
}

func (r createOrderRequest) validate() error {
	validationErr := &validationError{}

	if strings.TrimSpace(r.Customer.FullName) == "" {
		validationErr.add("customer.full_name", "full name is required")
	}

	if strings.TrimSpace(r.Customer.PhoneNumber) == "" {
		validationErr.add("customer.phone_number", "phone number is required")
	} else if len(strings.TrimSpace(r.Customer.PhoneNumber)) < 7 {
		validationErr.add("customer.phone_number", "phone number looks too short")
	}

	if strings.TrimSpace(r.Customer.Address) == "" {
		validationErr.add("customer.address", "address is required")
	}

	if email := strings.TrimSpace(r.Customer.Email); email != "" {
		if _, err := mail.ParseAddress(email); err != nil {
			validationErr.add("customer.email", "email must be valid")
		}
	}

	if r.SelectedDesignID == nil && strings.TrimSpace(r.CustomDesignURL) == "" {
		validationErr.add(
			"design",
			"either selected_design_id or custom_design_url is required",
		)
	}

	if customURL := strings.TrimSpace(r.CustomDesignURL); customURL != "" {
		if err := validateCustomDesignURL(customURL); err != nil {
			validationErr.add("custom_design_url", err.Error())
		}
	}

	validateMeasurement(validationErr, r.Measurement)

	if len(strings.TrimSpace(r.Notes)) > 1000 {
		validationErr.add("notes", "notes must be 1000 characters or fewer")
	}

	if validationErr.hasErrors() {
		return validationErr
	}

	return nil
}

func (r updateOrderStatusRequest) validate() (models.OrderStatus, error) {
	validationErr := &validationError{}
	status, err := models.ParseOrderStatus(r.Status)
	if err != nil {
		validationErr.add(
			"status",
			"status must be one of received, accepted, calling_customer, in_production, ready_for_delivery, delivered, rejected",
		)
	}

	if len(strings.TrimSpace(r.AdminNotes)) > 2000 {
		validationErr.add("admin_notes", "admin notes must be 2000 characters or fewer")
	}

	if validationErr.hasErrors() {
		return "", validationErr
	}

	return status, nil
}

func validateMeasurement(validationErr *validationError, measurement measurementInput) {
	if _, err := normalizeMeasurementUnit(measurement.Unit); err != nil {
		validationErr.add("measurement.unit", err.Error())
	}

	validateMeasurementNumber(
		validationErr,
		"measurement.stomach_width",
		measurement.StomachWidth,
	)
	validateMeasurementNumber(
		validationErr,
		"measurement.shoulder_width",
		measurement.ShoulderWidth,
	)
	validateMeasurementNumber(
		validationErr,
		"measurement.front_leg_to_shoulder_length",
		measurement.FrontLegToShoulderLength,
	)
	validateMeasurementNumber(
		validationErr,
		"measurement.hand_width",
		measurement.HandWidth,
	)
	validateMeasurementNumber(
		validationErr,
		"measurement.leg_width",
		measurement.LegWidth,
	)

	if len(strings.TrimSpace(measurement.AdditionalNotes)) > 1000 {
		validationErr.add(
			"measurement.additional_notes",
			"additional notes must be 1000 characters or fewer",
		)
	}
}

func validateMeasurementNumber(validationErr *validationError, field string, value float64) {
	if value <= 0 {
		validationErr.add(field, "must be greater than zero")
		return
	}

	if value > maxMeasurementValue {
		validationErr.add(
			field,
			fmt.Sprintf("must be less than or equal to %d", maxMeasurementValue),
		)
	}
}

func normalizeMeasurementUnit(unit string) (string, error) {
	normalized := strings.ToLower(strings.TrimSpace(unit))
	if normalized == "" {
		return "cm", nil
	}

	switch normalized {
	case "cm", "inch":
		return normalized, nil
	default:
		return "", fmt.Errorf("measurement unit must be cm or inch")
	}
}

func validateCustomDesignURL(raw string) error {
	if strings.HasPrefix(raw, "/uploads/") {
		return nil
	}

	parsed, err := url.ParseRequestURI(raw)
	if err != nil {
		return fmt.Errorf("custom design url must be a valid URL or /uploads path")
	}

	if parsed.Scheme != "http" && parsed.Scheme != "https" {
		return fmt.Errorf("custom design url must use http or https")
	}

	return nil
}
