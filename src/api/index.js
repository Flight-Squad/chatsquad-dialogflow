import express from 'express'
import logger from 'config/logger'
import { WebhookClient } from 'dialogflow-fulfillment';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/hook', async function (req, res) {
  logger.info('Request Body', req.body);
  logger.info('Request Query', req.query);
  logger.info('Request Params', req.params);
  logger.info('Request Headers', req.headers);
  // console.log(req);
  const agent = new WebhookClient({request: req, response: res});

  function weOnIt () {
    agent.add('Aight, we on it.');
    setTimeout(() => agent.add("Here's some shiz"), 7000);
  }

  let intentMap = new Map();
  intentMap.set('flight.book', weOnIt);
  // intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
  // res.sendStatus(201);
});

app.listen(port, () => logger.info(`Listening on port ${port}!`))
