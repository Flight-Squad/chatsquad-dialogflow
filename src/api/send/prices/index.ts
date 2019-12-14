import { Router } from "express";

const sendPricesRouter = Router();

sendPricesRouter.post('/', async (req, res) => {
  const {isRoundTrip, priceData, userId, platform} = req.body;

  res.sendStatus(201);
});

export default sendPricesRouter;
