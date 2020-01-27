import { Router } from "express";
import { projectId } from "config/gcp";
import logger from "config/logger";
import { sendPricesToDialogflow } from "actions/send/prices/toDialogflow";
import sendMessagesRouter from "./messages";

const sendRouter = Router();

sendRouter.use('/messages', sendMessagesRouter);

export default sendRouter;
