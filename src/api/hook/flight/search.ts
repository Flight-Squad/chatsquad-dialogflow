import { WebhookClient } from 'dialogflow-fulfillment';
import Axios from 'axios';
import uuidv4 from 'uuid/v4';
import { makeFlightSearchParams } from 'data/models/flight/search/params';
import logger from 'config/logger';

/**
 * Action taken on flight.search intent
 *
 * No Typescript defs for `dialogflow-fulfillment`.
 * See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/118
 * @param agent type `WebhookClient`
 */
export async function onFlightSearch(agent) {
  const requestId = sendPriceRequest(agent.session, agent.parameters);
  agent.context.set({ name: 'request-id', lifespan: 20, parameters: { id: requestId } });
  agent.add('Aight, we on it.');
}

async function sendPriceRequest(sessionPath, params) {
  const baseUri = process.env.PRICESQUAD_API;
  const flightParams = await makeFlightSearchParams(params);
  const res = await Axios.post(`${baseUri}/prices`, {
    sessionId: await parseSessionId(sessionPath),
    ...flightParams,
  });
  logger.debug('Price Request Response Data', res.data);
  return res.data.id;
  // Axios.post('https://chatsquad-webhook.herokuapp.com/sendPrices', {
  //   sessionId: agent.session,
  //   data: { yolo: 'hi' },
  // });
}

async function parseSessionId(sessionPath) {
  const parts = sessionPath.split('/');
  return parts[parts.length - 1];
}
