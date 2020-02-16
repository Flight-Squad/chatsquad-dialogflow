import { TripScraperQuery, BatchQueue } from "@flight-squad/admin";

console.log("Batch Queue config", process.env.BATCH_QUEUE_CONFIG);

export const ScraperQueue = new BatchQueue<TripScraperQuery>(
  JSON.parse(process.env.BATCH_QUEUE_CONFIG)
);
