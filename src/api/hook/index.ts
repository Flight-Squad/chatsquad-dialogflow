import express from 'express'
import logger from 'config/logger'
import { WebhookClient } from 'dialogflow-fulfillment';
import * as FlightIntent from 'intents/flight';
import { onFlightSearch } from './flight/search';
import { onFlightShow } from './flight/show';

const hookRouter = express.Router();

hookRouter.post('/hook', async (request, response) => {
  // Include all of these in a canonical line later
  // logger.info('Request Query', req.query);
  // logger.info('Request Params', req.params);
  // logger.info('Request Headers', req.headers);
  const agent = new WebhookClient({ request, response });
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  // if (agent.originalRequest.payload.body) {
  //   console.log(agent.originalRequest.payload.body.entry[0].messaging);
  //   console.log(request.headers);
  // }
  // logger.info('Orig request', request.body.originalDetectIntentRequest);
  // logger.info('Agent Contexts', agent.contexts);
  // console.log(agent.context.get('request-id'));
  // logger.info(`Session ${JSON.stringify(agent.session)}`);
  // logger.info('Intent Parameters', agent.parameters);

  let intentMap = new Map();
  intentMap.set('flight.search', async () => await onFlightSearch(agent));
  // intentMap.set('flight.show', async () => await onFlightShow(agent));
  intentMap.set('zed', async () => {
    await sleep(1000);
    agent.add('......');
    agent.setFollowupEvent('sampleCustomEvent');
  })
  // intentMap.set('flight.show', fallback);
  intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
  // res.sendStatus(201);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default hookRouter;
