import openflightsArray from "openflights-cached/array";
import iataToAirportMap from "openflights-cached/iata";
import logger from "config/logger";
import { IataMapper } from "@flight-squad/admin";

export async function mapFsAirportToIataList(
  airport: string,
  iataMapper: IataMapper
): Promise<Array<string>> {
  // Use `airport` if it maps directly to an airport
  // Filter out heliports
  const entry = iataToAirportMap[airport];
  if (entry && entry.name.toLowerCase().includes("airport")) return [airport];

  return await iataMapper.iatas(airport);
}

async function warnConcierge(message: string, options: any) {
  // TODO
  logger.error(message, options);
}

async function mapCityToIataList(cityName: string): Promise<Array<string>> {
  const airportsInNewYork = openflightsArray.filter(
    ({ city, name }) =>
      city.includes(cityName) && name.toLowerCase().includes("airport")
  );
  const iataAirports = airportsInNewYork.filter(({ iata }) => iata);
  const origins = iataAirports.map(entry => entry.iata);
  return origins;
}
