import openflightsArray from "openflights-cached/array";
import { mapFsAirportToIataList } from "data/airport/mappings";

/**
 * Slave copy of
 * Flight-Squad/pricesquad/src/data/models/flightSearchParams.ts
 */
export interface IFlightSearchParams {
  origin: string;
  dest: string;
  departDate: Date;
  returnDate?: Date;
  isRoundTrip: boolean;
  numStops: FlightStops;
}

/**
 * Slave copy of
 * Flight-Squad/pricesquad/src/data/models/flightSearchParams.ts
 */
export enum FlightStops {
  NonStop,
  OneStop,
  AnyStops
}

/**
 * Takes request data and normalizes it for internal use
 *
 * @param data from dialogflow agent parameters
 */
export function makeFlightSearchParams(data: any): IFlightSearchParams {
  // departure: string || { startDate: string, endDate: string };
  const { from, to, departure } = data;
  const params: any = {
    origin: from,
    dest: to,
    departDate: departure,
    returnDate: data.return,
    isRoundTrip: Boolean(data.return),
    numStops: 1, // TODO: make this variable
  };

  return params;
}

export async function makeBatchFlightParams(params: IFlightSearchParams) {
  const { isRoundTrip, numStops } = params;
  const batchParams: any = {
    origins: await mapFsAirportToIataList(params.origin),
    destinations: await mapFsAirportToIataList(params.dest),
    departDates: [params.departDate],
    isRoundTrip,
    numStops,
  }
  batchParams.returnDates = isRoundTrip ? [params.returnDate] : [];

  return batchParams;
}
