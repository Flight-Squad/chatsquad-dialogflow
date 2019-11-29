import { WebhookClient } from 'dialogflow-fulfillment';
import Axios from 'axios';

/**
 * Action taken on flight.search intent
 *
 * No Typescript defs for `dialogflow-fulfillment`.
 * See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/118
 * @param agent type `WebhookClient`
 */
export async function onFlightSearch(agent) {
  sendPriceRequest(agent);
  agent.setContext({ reqId: 'dummy' });
  agent.add('Aight, we on it.');
}

async function sendPriceRequest(agent) {
  Axios.post('https://chatsquad-webhook.herokuapp.com/sendPrices', {
    sessionId: agent.session,
    data: { yolo: 'hi' },
  });
}
