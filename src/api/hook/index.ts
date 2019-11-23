import express from 'express'
import logger from 'config/logger'
import { WebhookClient } from 'dialogflow-fulfillment';
import * as FlightIntent from '../../intents/flight';

const hookRouter = express.Router();

hookRouter.post('/hook', async (request, response) => {
  // Include all of these in a canonical line later
  // logger.info('Request Body', req.body);
  // logger.info('Request Query', req.query);
  // logger.info('Request Params', req.params);
  // logger.info('Request Headers', req.headers);
  const agent = new WebhookClient({request, response});

  let intentMap = new Map();
  intentMap.set('flight.book', FlightIntent.onSearch);
  // intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
})

export default hookRouter;
