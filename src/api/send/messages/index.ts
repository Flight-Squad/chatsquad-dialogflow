import { Router } from "express";

const sendMessagesRouter = Router();

sendMessagesRouter.post('/messenger', async (req, res) => {
  // TODO implement
});

sendMessagesRouter.post('/slack', async (req, res) => {
  // TODO implement
});

sendMessagesRouter.post('/wechat', async (req, res) => {
  // TODO implement
});

export default sendMessagesRouter;
