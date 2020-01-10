import { parseSessionId } from "actions/parse/session/id";
import logger from "config/logger";
import {
  Customer,
  Firebase,
  FlightSearchQueryFields
} from "@flight-squad/admin";
import { mapFsAirportToIataList } from "data/airport/mappings";

// TODO configure database and queue under src/config -> database.ts and queue.ts

// No Typescript defs for `dialogflow-fulfillment`.
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/118

/**
 * Action taken on flight.search intent
 *
 * @param agent type `WebhookClient`
 */
export async function onFlightSearch(agent) {
  // Note: not sure if agent.originalRequest refers to original express`request` or
  //    original detect intent request
  logger.info("Message Info", {
    info: JSON.stringify(agent.originalRequest.payload.body.entry[0], null, 2)
  });

  const userInfo = {
    platform: agent.originalRequest.payload.source,
    id: agent.originalRequest.payload.body.entry[0].messaging[0].sender.id
  };

  const customer = await Customer.fromMessaging(
    getDb(),
    userInfo.platform,
    userInfo.id
  );

  await customer.requestSearch(
    await makeSearchQuery(agent.parameters),
    queue,// TODO replace placeholder
    {
      session: await parseSessionId(agent.session),
      platform: userInfo.platform
    }
  );

  logger.info("User Info", userInfo);
  agent.add("Aight, we on it.");
}

/** Placeholder */
// TODO replace
function getDb(): Firebase {}

/**
 * Convert dialogflow intent parameters into
 * Flight Squad search query
 * @param params Parameters from Dialogflow agent
 */
async function makeSearchQuery(params): Promise<FlightSearchQueryFields> {
  const isRoundTrip = Boolean(params.return);
  return {
    origins: await mapFsAirportToIataList(params.from),
    dests: await mapFsAirportToIataList(params.to),
    departDates: [params.departure],
    returnDates: isRoundTrip ? [params.return] : [],
    isRoundTrip,
    stops: 1
  };
}
