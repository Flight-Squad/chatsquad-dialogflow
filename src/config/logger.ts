const logger = require('heroku-logger');
import debug from 'debug';

const flightSquadDebugger = debug('flightsquad');

export const createFlightSquadDebugger = (mod: string) => flightSquadDebugger.extend(mod);

export default logger;
