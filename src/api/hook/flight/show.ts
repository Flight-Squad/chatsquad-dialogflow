import Axios from "axios";
import { parseSessionId } from "actions/parse/session/id";
import logger from "config/logger";

export async function onFlightShow(agent) {
  // retrieve data based on session id
  const baseUri = process.env.PRICESQUAD_API;
  const sessionId = await parseSessionId(agent.session);
  const requestId = await agent.context.get('request-id').parameters.id;
  const req = await Axios.get(`${baseUri}/prices/${sessionId}/${requestId}`);
  const priceData = req.data.res;
  console.log(priceData);
  const bestGPrices = priceData.google.data.map(quote => quote.price).sort();
  agent.add(`Parameters: ${JSON.stringify(bestGPrices)}`);
}
