import { TripScraperQuery, BatchQueue } from "@flight-squad/admin";

console.log("Batch Queue config", process.env.BATCH_QUEUE_CONFIG);

/**
 * Returns an AWS Key Value pair from an environment variable
 * @param key environment variable to parse
 */
function env(key: string): { name: string; value: string } {
  return {
    name: key,
    value: process.env[key]
  };
}

export const ScraperQueue = new BatchQueue<TripScraperQuery>({
  ...JSON.parse(process.env.BATCH_QUEUE_CONFIG),
  region: process.env.AWS_QUEUE_REGION,
  // Environment Variables to pass through to Scraper Worker
  environment: [env("CHATSQUAD_API"), env("PRICESQUAD_API")]
});
