package server

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
)

type validationError struct {
	Fields map[string]string `json:"fields"`
}

func (e *validationError) Error() string {
	return "validation failed"
}

func (e *validationError) add(field string, message string) {
	if e.Fields == nil {
		e.Fields = map[string]string{}
	}

	e.Fields[field] = message
}

func (e *validationError) hasErrors() bool {
	return len(e.Fields) > 0
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(payload); err != nil {
		http.Error(w, `{"message":"failed to encode response"}`, http.StatusInternalServerError)
	}
}

func writeError(w http.ResponseWriter, status int, message string, err error) {
	response := map[string]any{
		"message": message,
	}

	var validationErr *validationError
	if errors.As(err, &validationErr) {
		response["fields"] = validationErr.Fields
	}

	if err != nil {
		response["error"] = err.Error()
	}

	writeJSON(w, status, response)
}

func decodeJSON(r *http.Request, dst any) error {
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(dst); err != nil {
		return fmt.Errorf("decode json body: %w", err)
	}

	if decoder.More() {
		return fmt.Errorf("request body must contain a single JSON object")
	}

	return nil
}

func parseUint(value string) (uint, error) {
	parsed, err := strconv.ParseUint(strings.TrimSpace(value), 10, 64)
	if err != nil {
		return 0, fmt.Errorf("parse unsigned integer: %w", err)
	}

	return uint(parsed), nil
}

func parseLimit(raw string, fallback int, max int) (int, error) {
	if strings.TrimSpace(raw) == "" {
		return fallback, nil
	}

	parsed, err := strconv.Atoi(raw)
	if err != nil {
		return 0, fmt.Errorf("invalid limit: %w", err)
	}

	if parsed <= 0 {
		return 0, fmt.Errorf("limit must be greater than zero")
	}

	if parsed > max {
		return max, nil
	}

	return parsed, nil
}

func newTrackingCode() (string, error) {
	randomBytes := make([]byte, 6)
	if _, err := rand.Read(randomBytes); err != nil {
		return "", fmt.Errorf("generate tracking code: %w", err)
	}

	return "HK-" + strings.ToUpper(hex.EncodeToString(randomBytes)), nil
}

// validateFilePath ensures the filename doesn't contain path traversal attempts
func validateFilePath(fileName string) error {
	if fileName == "" {
		return fmt.Errorf("filename cannot be empty")
	}

	// Check for null bytes (null injection)
	if strings.Contains(fileName, "\x00") {
		return fmt.Errorf("filename contains null bytes")
	}

	// Check for path traversal patterns
	if strings.Contains(fileName, "..") {
		return fmt.Errorf("filename contains path traversal attempt")
	}

	// Check for absolute paths
	if filepath.IsAbs(fileName) {
		return fmt.Errorf("filename cannot be an absolute path")
	}

	// Check for directory separators
	if strings.Contains(fileName, string(filepath.Separator)) || strings.Contains(fileName, "/") {
		return fmt.Errorf("filename cannot contain path separators")
	}

	return nil
}

// isPathWithin checks if targetPath is within basePath to prevent path traversal
func isPathWithin(targetPath, basePath string) bool {
	// Ensure both paths are absolute and cleaned
	rel, err := filepath.Rel(basePath, targetPath)
	if err != nil {
		return false
	}

	// If the relative path starts with .., it's outside the base directory
	if strings.HasPrefix(rel, "..") {
		return false
	}

	return true
}
