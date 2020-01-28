import logger from "config/logger";
import { Trip } from "@flight-squad/admin";

export async function makePriceMessage(platform: string, isRoundTrip: boolean, trip: Trip, paymentUrl: string) {
  logger.info('Trips', {trip: JSON.stringify(trip, null, 2)});
  const stops = trip.stops.length - 2 <= 0 ? 'non-stop' : `${trip.stops.length - 2}-stop`
  let message: string;
  try {
    message = `So far, we found a $${trip.price} trip! You can find more details at ${paymentUrl}.

** If anything seems off, please let us know, and our human agents will be with you shortly!`;
  } catch(e) {
    // TODO error reporting and debugging info
    return "Something went wrong. I'm sorry! A human team member will be in touch shortly.";
  }
}
