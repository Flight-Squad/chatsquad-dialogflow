import Axios from "axios";
import { parseSessionId } from "actions/parse/session/id";
import logger from "config/logger";
import { Contexts } from "config/dialogflow";

export async function onFlightShow(agent) {
  const baseUri = process.env.PRICESQUAD_API;

  // retrieve data based on session id
  const sessionId = await parseSessionId(agent.session);
  const docPath = await agent.context.get(Contexts.ResourceId).parameters.id;

  // TODO Change this when pricesquad GET is updated
  const req = await Axios.get(`${baseUri}/prices/${docPath}`);
  const priceData = req.data.prices;

  if (priceData) {
    agent.add(`The best price online is $${priceData[0]}!`);
  } else {
    // TODO error reporting and debugging info
    agent.add("Something went wrong. I'm sorry! A human team member will be in touch shortly.");
  }
}
