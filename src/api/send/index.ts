import { Router } from "express";
import { projectId } from "config/gcp";
import logger from "config/logger";
import { sendPricesToDialogflow } from "actions/send/prices/toDialogflow";
import sendMessagesRouter from "./messages";

const sendRouter = Router();

sendRouter.use('/messages', sendMessagesRouter);

sendRouter.post('/prices', async (req, res) => {
  const {sessionId, ...data} = req.body;
  const session = `projects/${projectId}/agent/sessions/${sessionId}`;
  logger.info('Session', {session});
  await sendPricesToDialogflow(session, data);
  res.sendStatus(201);
});

export default sendRouter;
