import { parseSessionId } from 'actions/parse/session/id';
import Axios from 'axios';
import { Contexts } from 'config/dialogflow';
import logger from 'config/logger';
import * as Services from 'config/services';
import { makeBatchFlightParams, makeFlightSearchParams } from 'data/models/flight/search/params';

/**
 * Action taken on flight.search intent
 *
 * No Typescript defs for `dialogflow-fulfillment`.
 * See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/118
 * @param agent type `WebhookClient`
 */
export async function onFlightSearch(agent) {
  const docPath = await sendPriceRequest(agent.session, agent.parameters);
  // use `id` instead of path to abstract the actual resource that identifies the db entry
  agent.context.set({ name: Contexts.ResourceId, lifespan: 20, parameters: { id: docPath } });
  agent.add('Aight, we on it.');
  agent.setFollowupEvent('sampleCustomEvent');
}

async function sendPriceRequest(sessionPath, params) {
  const baseUri = Services.Pricesquad;
  const flightParams = await makeFlightSearchParams(params);
  const batchFlightParams = await makeBatchFlightParams(flightParams);
  const res = await Axios.post(`${baseUri}/prices/batch`, {
    sessionId: await parseSessionId(sessionPath),
    ...batchFlightParams,
  });
  logger.debug('Price Request Response Data', res.data);
  return res.data.id;
}
