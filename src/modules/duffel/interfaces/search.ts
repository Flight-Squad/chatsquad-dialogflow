import {
  IataArea,
  IataEntity,
  Baggage,
  Aircraft,
  OriginOrDest,
  MarketingCarrier,
  OperatingCarrier,
  Owner
} from "./common";

export interface DuffelSearch {
  cabin_class: string;
  slices: DuffelSearchQuery[];
  passengers: PassengerType[];
}

export interface DuffelSearchQuery {
  created_at?: Date;
  departure_date: string;
  destination: string;
  origin: string;
}

export interface PassengerType {
  type: string;
}

export interface PassengerMeta {
  baggages: Baggage[];
  cabin_class: string;
  cabin_class_marketing_name: string;
  passenger_id: string;
}

export interface Segment {
  aircraft: Aircraft;
  arriving_at: Date;
  departing_at: Date;
  destination: OriginOrDest;
  destination_terminal: string;
  distance: string;
  duration: string;
  marketing_carrier: MarketingCarrier;
  marketing_carrier_flight_number: string;
  operating_carrier: OperatingCarrier;
  operating_carrier_flight_number: string;
  origin: OriginOrDest;
  origin_terminal: string;
  passengers: PassengerMeta[];
}

export interface Slice {
  destination: OriginOrDest;
  duration: string;
  origin: OriginOrDest;
  segments: Segment[];
}

export interface Offer {
  base_amount: string;
  base_currency: string;
  created_at: Date;
  expires_at: Date;
  id: string;
  live_mode: boolean;
  owner: Owner;
  slices: Slice[];
  tax_amount: string;
  tax_currency: string;
  total_amount: string;
  total_currency: string;
}

export interface DuffelSearchResponsePassenger extends PassengerType {
  id: string;
  type: string;
}

export interface DuffelSearchResponseQuery {
  created_at: Date;
  departure_date: string;
  destination: OriginOrDest;
  origin: OriginOrDest;
}

export interface DuffelSearchResponse {
  cabin_class: string;
  created_at: Date;
  id: string;
  live_mode: boolean;
  offers: Offer[];
  passengers: DuffelSearchResponsePassenger[];
  slices: DuffelSearchResponseQuery[];
}
