import { projectId, sessionClient } from 'config/gcp';
import logger from 'config/logger';
import express from 'express';
import hookRouter from './hook';
import sendRouter from './send';

const app = express()
const port = process.env.PORT || 3000

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

app.use(express.json())

app.use('/hook', hookRouter);
app.use('/send', sendRouter);

app.get('/', (req, res) => res.send('OK'));

// deprecated, see /send/prices
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
});

app.listen(port, () => logger.info(`Listening on port ${port}!`));

