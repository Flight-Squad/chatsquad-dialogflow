import { SqsQueue, TripScraperQuery } from "@flight-squad/admin";

export const ScraperQueue = new SqsQueue<TripScraperQuery>(process.env.AWS_QUEUE_REGION, process.env.AWS_QUEUE)
