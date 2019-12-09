import Axios from "axios";
import { parseSessionId } from "actions/parse/session/id";
import logger from "config/logger";
import { Contexts } from "config/dialogflow";

export async function onFlightShow(agent) {
  const baseUri = process.env.PRICESQUAD_API;
  if (!agent.requestSource) {
    agent.requestSource = 'FACEBOOK';
  }

  // retrieve data based on session id
  const sessionId = await parseSessionId(agent.session);
  const docPath = await agent.context.get(Contexts.ResourceId).parameters.id;

  // TODO Change this when pricesquad GET is updated
  const req = await Axios.get(`${baseUri}/prices/${docPath}`);
  const priceData = req.data.res;

  if (priceData) {
    logger.info('Req Source', {src: agent.requestSource})
    const bestTrip = priceData[0];
    const {airline, stops, duration, times, price, layover} = bestTrip;
    const ourPrice = calculateTemplatePrice(price);
    const sepTimes = times.split('–'); // UTF U+0096
    const takeoff = sepTimes[0].trim();
    const arrival = sepTimes[1].trim();
    agent.add([
      `It looks like the public price for this trip is around $${price} right now.`,
      `So far, we found a $${ourPrice} ${stops} ${duration} trip leaving at ${takeoff} and landing at ${arrival} local time operated by ${airline}.`,
      `Our human agents will follow up soon to further assist you!`,
    ]);
    // agent.add(`It looks like the public price for this trip is around $${price} right now.`);
    // agent.add(`So far, we found a $${ourPrice} ${stops} ${duration} trip leaving at ${takeoff} and landing at ${arrival} local time operated by ${airline}.`);
    // agent.add(`Our human agents will follow up soon to further assist you!`);
  } else {
    // TODO error reporting and debugging info
    agent.add("Something went wrong. I'm sorry! A human team member will be in touch shortly.");
  }
}

function calculateTemplatePrice(price: number) {
  if (price <= 300) return (price * 0.94).toFixed(2);
  if (price > 300 && price <= 500) return (price * 0.89).toFixed(2);

  // else
  return (price * 0.86).toFixed(2);
}
