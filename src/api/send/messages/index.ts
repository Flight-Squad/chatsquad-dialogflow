import { Router } from "express";
import { makePriceMessage } from "actions/make/priceMessage";
import { sendMessage } from "actions/send/messages";
import { PaymentMessageReq } from "@flight-squad/common";

const sendMessagesRouter = Router();

sendMessagesRouter.post("/", async (req, res) => {
  const { id, platform, message } = req.body;
  await sendMessage(platform, id, message);
  res.sendStatus(201);
});

/**
 * Body:
 *
    isRoundTrip: Boolean,
    platform: string (e.g 'facebook')
    userId: string,
    trips: Array<any>,
 */
sendMessagesRouter.post("/payment", async (req, res) => {
  const reqData: PaymentMessageReq = req.body;
  const message = await makePriceMessage(
    reqData.platform,
    reqData.query.isRoundTrip,
    reqData.trip,
    reqData.payment.url
  );
  await sendMessage(reqData.platform, reqData.id, message);

  res.sendStatus(201);
});

sendMessagesRouter.post("/messenger", async (req, res) => {
  // TODO implement
});

sendMessagesRouter.post("/slack", async (req, res) => {
  // TODO implement
});

sendMessagesRouter.post("/wechat", async (req, res) => {
  // TODO implement
});

export default sendMessagesRouter;
