package server

import "testing"

func TestCreateOrderRequestValidate(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		req     createOrderRequest
		wantErr bool
	}{
		{
			name: "valid request with uploaded image",
			req: createOrderRequest{
				Customer: customerInput{
					FullName:    "Sara Ali",
					Email:       "sara@example.com",
					PhoneNumber: "+251911000000",
					Address:     "Addis Ababa",
				},
				Measurement: measurementInput{
					Unit:                     "cm",
					StomachWidth:             82,
					ShoulderWidth:            39,
					FrontLegToShoulderLength: 132,
					HandWidth:                19,
					LegWidth:                 24,
				},
				CustomDesignURL: "/uploads/designs/example.png",
			},
		},
		{
			name: "missing design source",
			req: createOrderRequest{
				Customer: customerInput{
					FullName:    "Sara Ali",
					PhoneNumber: "+251911000000",
					Address:     "Addis Ababa",
				},
				Measurement: measurementInput{
					Unit:                     "cm",
					StomachWidth:             82,
					ShoulderWidth:            39,
					FrontLegToShoulderLength: 132,
					HandWidth:                19,
					LegWidth:                 24,
				},
			},
			wantErr: true,
		},
		{
			name: "invalid measurement value",
			req: createOrderRequest{
				Customer: customerInput{
					FullName:    "Sara Ali",
					PhoneNumber: "+251911000000",
					Address:     "Addis Ababa",
				},
				Measurement: measurementInput{
					Unit:                     "cm",
					StomachWidth:             0,
					ShoulderWidth:            39,
					FrontLegToShoulderLength: 132,
					HandWidth:                19,
					LegWidth:                 24,
				},
				CustomDesignURL: "/uploads/designs/example.png",
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			err := tt.req.validate()
			if tt.wantErr {
				if err == nil {
					t.Fatal("expected validation error")
				}

				return
			}

			if err != nil {
				t.Fatalf("unexpected validation error: %v", err)
			}
		})
	}
}
