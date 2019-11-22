import express from 'express'
import logger from 'config/logger'
import { WebhookClient } from 'dialogflow-fulfillment';
import {sessionClient} from 'config/gcp';
import { projectId } from '../config/gcp';
import Axios from 'axios';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/hook', async function (req, res) {
  // Include all of these in a canonical line later
  // logger.info('Request Body', req.body);
  // logger.info('Request Query', req.query);
  // logger.info('Request Params', req.params);
  // logger.info('Request Headers', req.headers);
  const agent = new WebhookClient({request: req, response: res});
  const sesssionId = await parseSessionId(agent.session);
  logger.info(`Session ${JSON.stringify(agent.session)}`);

  let intentMap = new Map();
  intentMap.set('flight.book', async () => {
    agent.add('Aight, we on it.');
    Axios.post('https://chatsquad-webhook.herokuapp.com/sendPrices', {
      sessionId: agent.session,
      data: {
        yolo: 'hi',
      },
    })
  });
  intentMap.set('flight.show', () => agent.add('Will show prices'));
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
          parameters: data,
        },
      },
    }
  );
  res.sendStatus(201);
})

app.listen(port, () => logger.info(`Listening on port ${port}!`))
