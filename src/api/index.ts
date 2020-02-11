import logger from 'config/logger';
import express from 'express';
import hookRouter from './hook';
import sendRouter from './send';
import iataToAirportMap from "openflights-cached/iata";

const app = express()
const port = process.env.PORT || 3000

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

app.use(express.json())

app.use('/hook', hookRouter);
app.use('/send', sendRouter);

app.get('/', (req, res) => res.send('OK'));

// deprecated, see /send/prices
app.get('/airport', (req, res) => {
  const { iata } = req.body;
  const airport = iataToAirportMap[iata];
  if (airport && airport.name.toLowerCase().includes('airport')) {
    res.status(200).send(JSON.stringify(airport));
  }

  res.sendStatus(404);
});

app.listen(port, () => logger.info(`Listening on port ${port}!`));

