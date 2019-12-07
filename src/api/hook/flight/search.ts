import { WebhookClient } from 'dialogflow-fulfillment';
import Axios from 'axios';
import uuidv4 from 'uuid/v4';
import { makeFlightSearchParams, IFlightSearchParams, makeBatchFlightParams } from 'data/models/flight/search/params';
import logger from 'config/logger';
import { parseSessionId } from 'actions/parse/session/id';

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
  agent.context.set({ name: 'doc-path', lifespan: 20, parameters: { id: docPath } });
  agent.add('Aight, we on it.');
}

async function sendPriceRequest(sessionPath, params) {
  const baseUri = process.env.PRICESQUAD_API;
  const flightParams = await makeFlightSearchParams(params);
  const batchFlightParams = await makeBatchFlightParams(flightParams);
  const res = await Axios.post(`${baseUri}/prices/batch`, {
    sessionId: await parseSessionId(sessionPath),
    ...batchFlightParams,
  });
  logger.debug('Price Request Response Data', res.data);
  return res.data.id;
  // Axios.post('https://chatsquad-webhook.herokuapp.com/sendPrices', {
  //   sessionId: agent.session,
  //   data: { yolo: 'hi' },
  // });
}
