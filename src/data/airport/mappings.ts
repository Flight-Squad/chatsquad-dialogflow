import openflightsArray from "openflights-cached/array";
import iataToAirportMap from "openflights-cached/iata";
import logger from "config/logger";
import Axios from "axios";

export async function mapFsAirportToIataList(airport: string) : Promise<Array<string>> {
  // Use `airport` if it maps directly to an airport
  // Filter out heliports
  const entry = iataToAirportMap[airport];
  if (entry && entry.name.toLowerCase().includes('airport')) return [airport];

  // const cityName = await mapFsAirportToCity(airport);

  // if (!cityName) {
  //   await warnConcierge('No city mapping found', {airport});
  //   throw new Error(`No city mapping found for ${airport}`);
  // }
  const baseUri = process.env.PRICESQUAD_API;
  const res = await Axios.get(`${baseUri}/airports/${airport}`);
  console.log(res.data);
  const list = res.data.airports;
  logger.info('Airport Mappings', {airport, list});
  return list;
}

async function mapFsAirportToCity(airport: string) : Promise<string> {
  let cityName = '';
  switch (airport) {
    case 'NYC': cityName = 'New York'; break;
    case 'LA': cityName = 'Los Angeles'; break;
    default: logger.error('No city mapping configured', { airport }); // throw error and alert concierge
  }
  return cityName;
}

async function warnConcierge(message: string, options: any) {
  // TODO
  logger.error(message, options);
}

async function mapCityToIataList(cityName: string) : Promise<Array<string>> {
  const airportsInNewYork = openflightsArray.filter(({ city, name }) => city.includes(cityName) && name.toLowerCase().includes('airport'));
  const iataAirports = airportsInNewYork.filter(({ iata }) => iata);
  const origins = iataAirports.map(entry => entry.iata);
  return origins;
}
