package models

import "testing"

func TestParseOrderStatus(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		input   string
		want    OrderStatus
		wantErr bool
	}{
		{
			name:  "accepted status",
			input: "accepted",
			want:  OrderStatusAccepted,
		},
		{
			name:  "normalizes case and spacing",
			input: " In_Production ",
			want:  OrderStatusInProduction,
		},
		{
			name:    "rejects unknown status",
			input:   "shipping",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got, err := ParseOrderStatus(tt.input)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("ParseOrderStatus(%q) expected error", tt.input)
				}

				return
			}

			if err != nil {
				t.Fatalf("ParseOrderStatus(%q) unexpected error: %v", tt.input, err)
			}

			if got != tt.want {
				t.Fatalf("ParseOrderStatus(%q) = %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}
