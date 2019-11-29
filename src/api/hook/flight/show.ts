import Axios from "axios";

export async function onFlightShow(agent) {
  // retrieve data based on session id
  const baseUri = process.env.PRICESQUAD_API;
  const pricesquadReq = await Axios.get(`${baseUri}/prices/001203ff-4057-4c59-af1d-0150aaaa92c2`);
  const priceData = pricesquadReq.data.res;
  const bestGPrices = priceData.google.data.map(quote => quote.price).sort();
  agent.add(`Parameters: ${JSON.stringify(bestGPrices)}`);
}
