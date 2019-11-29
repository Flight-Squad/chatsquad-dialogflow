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
  const {from, to, departure} = data;
  const params: any = {
    origin: from,
    dest: to,
    numStops: 1, // TODO: make this variable
  };

  const isRoundTrip = departure.startDate !== undefined;
  if (isRoundTrip) {
    params.returnDate = new Date(departure.endDate);
    params.departDate = new Date(departure.startDate);
  } else {
    params.departDate = departure;
  }

  return params;
}
