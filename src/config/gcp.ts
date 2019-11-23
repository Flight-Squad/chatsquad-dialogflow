import dialogflow from 'dialogflow';
import path from 'path';
import logger from './logger';
const fs = require('fs');

export const projectId = process.env.GCP_PROJECT_ID;

const creds = process.env.GCP_CREDS;

fs.writeFileSync(path.resolve(__dirname, './ChatSquad-SA.json'), creds);

logger.info('GCP Service Account saved!');

export const keyFile = path.resolve(__dirname, './ChatSquad-SA.json');

export const sessionClient = new dialogflow.SessionsClient({
  keyFilename: keyFile
});

// Commented out - we might need this later
// const sessionId = uuid.v4();
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);
