import express from 'express'
import logger from 'config/logger'
import { WebhookClient } from 'dialogflow-fulfillment';
import {sessionClient} from 'config/gcp';
import { projectId } from '../config/gcp';
import Axios from 'axios';
import hookRouter from './hook';

const app = express()
const port = process.env.PORT || 3000

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

app.use(express.json())

app.use('/hook', hookRouter);
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/sendPrices', (req, res) => {
  const {sessionId, ...data} = req.body;
  const session = `projects/${projectId}/agent/sessions/${sessionId}`;
  logger.info('Session', {session});
  sessionClient.detectIntent(
    {
      session,
      // session: sessionId,

      // Trigger a response event
      // https://googleapis.dev/nodejs/dialogflow/latest/google.cloud.dialogflow.v2beta1.html#.QueryInput
      // https://cloud.google.com/dialogflow/docs/events-custom
      queryInput: {
        text: {
          text: "",
          languageCode: 'en-US',
        },
        event: {
          name: 'displayFlight',
          parameters: data || {},
          languageCode: "en-US",
        },
      },
    }
  );
  res.sendStatus(201);
})

app.listen(port, () => logger.info(`Listening on port ${port}!`))

