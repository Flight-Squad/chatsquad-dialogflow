import express from 'express'
import logger from 'config/logger'
import { WebhookClient } from 'dialogflow-fulfillment';
import {sessionClient} from 'config/gcp';
import { projectId } from '../config/gcp';
import Axios from 'axios';

const app = express()
const port = process.env.PORT || 3000

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/hook', async function (req, res) {
  // Include all of these in a canonical line later
  // logger.info('Request Query', req.query);
  // logger.info('Request Params', req.params);
  // logger.info('Request Headers', req.headers);
  const agent = new WebhookClient({request: req, response: res});
  const sesssionId = await parseSessionId(agent.session);
  // logger.info(`Session ${JSON.stringify(agent.session)}`);
  logger.info('Intent Parameters', agent.parameters);

  let intentMap = new Map();
  intentMap.set('flight.search', async () => {
    agent.add('Aight, we on it.');
    dummyWork(agent);
  });
  intentMap.set('flight.show', () => agent.add(`Parameters: ${JSON.stringify(agent.originalRequest)}`));
  // intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
  // res.sendStatus(201);
});

async function parseSessionId(sessionPath) {
  const parts = sessionPath.split('/');
  return parts[parts.length - 1];
}

app.post('/sendPrices', (req, res) => {
  const {sessionId, ...data} = req.body;
  console.log(data);
  // logger.info('SendPrices::Data', arr);
  // logger.info('SendPrices::DataKeys', Object.keys(data));
  sessionClient.detectIntent(
    {
      // session: `projects/${projectId}/agent/sessions/${sessionId}`,
      session: sessionId,

      // Trigger a response event
      // https://googleapis.dev/nodejs/dialogflow/latest/google.cloud.dialogflow.v2beta1.html#.QueryInput
      // https://cloud.google.com/dialogflow/docs/events-custom
      queryInput: {
        event: {
          name: 'displayFlight',
          parameters: {
            data: JSON.stringify(data),
          },
          languageCode: "en-US",
        },
      },
    }
  );
  res.sendStatus(201);
})

app.listen(port, () => logger.info(`Listening on port ${port}!`))

async function dummyWork(agent) {
  const pricesquadReq = await Axios.get('https://pricesquad-dev-0.herokuapp.com/prices/001203ff-4057-4c59-af1d-0150aaaa92c2');
  const priceData = pricesquadReq.data.res;
  // logger.info('Pricesquad Data', priceData);
  Axios.post('https://chatsquad-webhook.herokuapp.com/sendPrices', {
      sessionId: agent.session,
      data: priceData,
    });
}
