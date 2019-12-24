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
  // Note: not sure if agent.originalRequest refers to original express`request` or
  //    original detect intent request
  console.log(`Message info\n${JSON.stringify(agent.originalRequest.payload.body.entry[0], null, 2)}`)
  const userInfo = {
    platform: agent.originalRequest.payload.source,
    id: agent.originalRequest.payload.body.entry[0].messaging[0].sender.id,
  };
  logger.info('User Info', userInfo);
  const docPath = await sendPriceRequest(agent.session, agent.parameters, userInfo);


  // use `id` instead of path to abstract the actual resource that identifies the db entry
  agent.context.set({ name: Contexts.ResourceId, lifespan: 20, parameters: { id: docPath } });

  agent.add('Aight, we on it.');
  // agent.setFollowupEvent('sampleCustomEvent');
}

async function sendPriceRequest(sessionPath, params, user) {
  const baseUri = Services.Pricesquad;
  const flightParams = await makeFlightSearchParams(params);
  const batchFlightParams = await makeBatchFlightParams(flightParams);
  const res = await Axios.post(`${baseUri}/prices/batch`, {
    sessionId: await parseSessionId(sessionPath),
    ...batchFlightParams,
    user,
  });
  logger.debug('Price Request Response Data', res.data);
  return res.data.id;
}
