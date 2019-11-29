import Axios from "axios";
import { parseSessionId } from "actions/parse/session/id";

export async function onFlightShow(agent) {
  // retrieve data based on session id
  const baseUri = process.env.PRICESQUAD_API;
  const docId = `${parseSessionId(agent.session)}#${agent.context.get('request-id').parameters.id}`;
  const pricesquadReq = await Axios.get(`${baseUri}/prices/${docId}`);
  const priceData = pricesquadReq.data.res;
  const bestGPrices = priceData.google.data.map(quote => quote.price).sort();
  agent.add(`Parameters: ${JSON.stringify(bestGPrices)}`);
}
