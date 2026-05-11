package models

import (
	"fmt"
	"strings"
	"time"
)

type OrderStatus string

const (
	OrderStatusReceived         OrderStatus = "received"
	OrderStatusAccepted         OrderStatus = "accepted"
	OrderStatusCallingCustomer  OrderStatus = "calling_customer"
	OrderStatusInProduction     OrderStatus = "in_production"
	OrderStatusReadyForDelivery OrderStatus = "ready_for_delivery"
	OrderStatusDelivered        OrderStatus = "delivered"
	OrderStatusRejected         OrderStatus = "rejected"
)

var validOrderStatuses = map[OrderStatus]struct{}{
	OrderStatusReceived:         {},
	OrderStatusAccepted:         {},
	OrderStatusCallingCustomer:  {},
	OrderStatusInProduction:     {},
	OrderStatusReadyForDelivery: {},
	OrderStatusDelivered:        {},
	OrderStatusRejected:         {},
}

func ParseOrderStatus(raw string) (OrderStatus, error) {
	status := OrderStatus(strings.TrimSpace(strings.ToLower(raw)))
	if _, ok := validOrderStatuses[status]; !ok {
		return "", fmt.Errorf("invalid order status: %s", raw)
	}

	return status, nil
}

type User struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	FullName    string    `json:"full_name" gorm:"size:120;not null"`
	Email       string    `json:"email,omitempty" gorm:"size:120"`
	PhoneNumber string    `json:"phone_number" gorm:"size:30;not null;uniqueIndex"`
	Address     string    `json:"address" gorm:"size:255;not null"`
	Orders      []Order   `json:"-" gorm:"foreignKey:UserID"`
}

type Design struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Name        string    `json:"name" gorm:"size:120;not null"`
	ImageURL    string    `json:"image_url" gorm:"size:255;not null"`
	Description string    `json:"description,omitempty" gorm:"type:text"`
	Category    string    `json:"category,omitempty" gorm:"size:80"`
	IsActive    bool      `json:"is_active" gorm:"not null;default:true"`
}

type Order struct {
	ID               uint        `json:"id" gorm:"primaryKey"`
	CreatedAt        time.Time   `json:"created_at"`
	UpdatedAt        time.Time   `json:"updated_at"`
	TrackingCode     string      `json:"tracking_code" gorm:"size:24;not null;uniqueIndex"`
	UserID           uint        `json:"user_id" gorm:"not null"`
	User             User        `json:"customer"`
	Status           OrderStatus `json:"status" gorm:"type:varchar(32);not null;default:'received'"`
	SelectedDesignID *uint       `json:"selected_design_id,omitempty"`
	SelectedDesign   *Design     `json:"selected_design,omitempty"`
	CustomDesignURL  string      `json:"custom_design_url,omitempty" gorm:"size:255"`
	Notes            string      `json:"notes,omitempty" gorm:"type:text"`
	AdminNotes       string      `json:"admin_notes,omitempty" gorm:"type:text"`
	Measurement      Measurement `json:"measurement"`
}

type Measurement struct {
	ID                       uint      `json:"id" gorm:"primaryKey"`
	CreatedAt                time.Time `json:"created_at"`
	UpdatedAt                time.Time `json:"updated_at"`
	OrderID                  uint      `json:"order_id" gorm:"not null;uniqueIndex"`
	Unit                     string    `json:"unit" gorm:"size:12;not null;default:'cm'"`
	StomachWidth             float64   `json:"stomach_width" gorm:"not null"`
	ShoulderWidth            float64   `json:"shoulder_width" gorm:"not null"`
	FrontLegToShoulderLength float64   `json:"front_leg_to_shoulder_length" gorm:"not null"`
	HandWidth                float64   `json:"hand_width" gorm:"not null"`
	LegWidth                 float64   `json:"leg_width" gorm:"not null"`
	AdditionalNotes          string    `json:"additional_notes,omitempty" gorm:"type:text"`
}
