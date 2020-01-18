import { parseSessionId } from "actions/parse/session/id";
import logger from "config/logger";
import {
  Customer,
  FlightSearchQueryFields,
  IataMapper
} from "@flight-squad/admin";
import { mapFsAirportToIataList } from "data/airport/mappings";
import { ScraperQueue } from "config/queue";
import { DB, LocationIataMap } from "config/database";
import { createFlightSquadDebugger } from "config/logger";

const debug = createFlightSquadDebugger('search')

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
    DB,
    userInfo.platform,
    userInfo.id
  );

  logger.info('Customer retrieved');

  if (!LocationIataMap.loaded()) {
    await LocationIataMap.load();
  }

  debug('Agent Parameters %O', agent.parameters);

  const query = await makeSearchQuery(agent.parameters, LocationIataMap);
  debug('Query %O', {...query, numTrips: query.origins.length * query.dests.length * query.departDates.length * (query.returnDates.length || 1)})

  logger.info('Query Created')

  await customer.requestSearch(
    query,
    ScraperQueue,
    {
      session: await parseSessionId(agent.session),
      platform: userInfo.platform
    }
  );

  logger.info("User Info", userInfo);
  agent.add("Aight, we on it.");
}

/**
 * Convert dialogflow intent parameters into
 * Flight Squad search query
 * @param params Parameters from Dialogflow agent
 */
async function makeSearchQuery(params, iataMapper: IataMapper): Promise<FlightSearchQueryFields> {
  const isRoundTrip = Boolean(params.return);
  return {
    origins: await mapFsAirportToIataList(params.from, iataMapper),
    dests: await mapFsAirportToIataList(params.to, iataMapper),
    departDates: [params.departure],
    returnDates: isRoundTrip ? [params.return] : [],
    isRoundTrip,
    stops: 1,
  };
}
