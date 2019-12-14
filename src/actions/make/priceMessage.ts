export async function makePriceMessage(platform: string, isRoundTrip: boolean, trips) {
  if (trips) {
    // logger.info('Req Source', {src: agent.requestSource})
    const bestTrip = trips[0];
    const { airline, stops, duration, times, price, layover } = bestTrip;
    const ourPrice = calculateTemplatePrice(price);
    const sepTimes = times.split('–'); // UTF U+0096
    const takeoff = sepTimes[0].trim();
    const arrival = sepTimes[1].trim();

    let message: string;

    if (isRoundTrip) {
      message = `It looks like the public price for this trip is around $${price} right now.

    So far, we found a $${ourPrice} round-trip itinerary. The first trip would be ${stops} with a ${duration} total travel time leaving at ${takeoff} and landing at ${arrival} local time operated by ${airline}.

    Our human agents will follow up soon to send you the return trip details and further assist you!`;
    } else {
      message = `It looks like the public price for this trip is around $${price} right now.

    So far, we found a $${ourPrice} trip that is ${stops} with a ${duration} total travel time leaving at ${takeoff} and landing at ${arrival} local time operated by ${airline}.

    Our human agents will follow up soon to further assist you!`;
    }
    return message;

    // agent.add(`It looks like the public price for this trip is around $${price} right now.`);
    // agent.add(`So far, we found a $${ourPrice} ${stops} ${duration} trip leaving at ${takeoff} and landing at ${arrival} local time operated by ${airline}.`);
    // agent.add(`Our human agents will follow up soon to further assist you!`);
  } else {
    // TODO error reporting and debugging info
    return "Something went wrong. I'm sorry! A human team member will be in touch shortly.";
  }
}

function calculateTemplatePrice(price: number) {
  if (price <= 300) return (price * 0.94).toFixed(2);
  if (price > 300 && price <= 500) return (price * 0.89).toFixed(2);

  // else
  return (price * 0.86).toFixed(2);
}
