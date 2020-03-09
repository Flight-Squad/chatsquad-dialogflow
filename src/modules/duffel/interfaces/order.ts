import {
  Baggage,
  OriginOrDest,
  Aircraft,
  MarketingCarrier,
  OperatingCarrier,
  Owner
} from "./common";

export interface PassengerRequest {
  type: string;
  given_name: string;
  family_name: string;
  born_on: string;
  title: string;
  gender: string;
  email: string;
  phone_number: string;
  id: string;
}

export interface Payment {
  type: string;
  amount: string;
  currency: string;
}

export interface DuffelOrderRequest {
  selected_offers: string[];
  passengers: PassengerRequest[];
  payments: Payment[];
}

export interface PassengerResponse {
  baggages: Baggage[];
  cabin_class: string;
  cabin_class_marketing_name: string;
  passenger_id: string;
}

export interface Segment {
  aircraft: Aircraft;
  arriving_at: Date;
  destination_terminal: string;
  departing_at: Date;
  origin_terminal: string;
  destination: OriginOrDest;
  distance?: any;
  duration: string;
  marketing_carrier: MarketingCarrier;
  marketing_carrier_flight_number: string;
  operating_carrier: OperatingCarrier;
  operating_carrier_flight_number: string;
  origin: OriginOrDest;
  passengers: PassengerResponse[];
}

export interface Slice {
  destination: OriginOrDest;
  duration?: any;
  origin: OriginOrDest;
  segments: Segment[];
}

export interface DuffelOrderResponse {
  base_amount: string;
  base_currency: string;
  booking_reference: string;
  cancelled_at?: any;
  created_at: Date;
  id: string;
  live_mode: boolean;
  owner: Owner;
  slices: Slice[];
  tax_amount: string;
  tax_currency: string;
  total_amount: string;
  total_currency: string;
}

export interface DuffelOrderCancelResponse {
  id: string;
  expires_at: Date;
  order_id: string;
  refund_amount: string;
  refund_currency: string;
  status: string;
}
