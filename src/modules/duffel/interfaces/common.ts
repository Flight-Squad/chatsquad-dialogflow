export interface Identifiable<T> {
  id: T;
}

export interface IataCodifiable {
  iata_code: string;
}

export interface Nameable {
  name: string;
}

export interface HasType<T> {
  type: T;
}

export interface IataEntity
  extends Identifiable<string>,
    Nameable,
    IataCodifiable {}

export interface IataArea
  extends Identifiable<string>,
    IataCodifiable,
    Nameable,
    HasType<string> {
  iata_country_code: string;
  iata_city_code: string;
}

export interface Owner extends IataEntity {
  iata_code: string;
  id: string;
  name: string;
}

export interface City extends IataArea {
  iata_city_code: string;
  iata_code: string;
  iata_country_code: string;
  id: string;
  name: string;
  type: string;
}

export interface Airport extends IataArea {}

export interface OriginOrDest extends Airport {
  airports?: Airport[];
  city?: City;
}

export interface Aircraft extends IataEntity {
  iata_code: string;
  id: string;
  name: string;
}

export interface MarketingCarrier extends IataEntity {
  iata_code: string;
  id: string;
  name: string;
}

export interface OperatingCarrier extends IataEntity {
  iata_code: string;
  id: string;
  name: string;
}

export interface Baggage {
  quantity: number;
  type: string;
}
