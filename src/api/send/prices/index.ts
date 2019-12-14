import { Router } from "express";
import { sendMessage } from "actions/send/messages";
import { makePriceMessage } from "actions/make/priceMessage";

const sendPricesRouter = Router();

/**
 * Body:
 *
    isRoundTrip: Boolean,
    platform: string (e.g 'facebook')
    userId: string,
    trips: Array<any>,
 */
sendPricesRouter.post('/', async (req, res) => {
  const {isRoundTrip, trips, userId, platform} = req.body;
  const message = await makePriceMessage(platform, isRoundTrip, trips);
  await sendMessage(platform, userId, message);

  res.sendStatus(201);
});

export default sendPricesRouter;
