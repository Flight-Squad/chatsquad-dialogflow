import {
  ScraperQueueHandler,
  QueryConfig,
  ScraperDataTargets
} from "@flight-squad/admin";
import { DB } from "./database";

console.log("Batch Queue config", process.env.BATCH_QUEUE_CONFIG);

/**
 * Returns an environment variable or empty string
 * @param key environment variable to parse
 */
function env(key: string): string {
  return process.env[key] || "";
}

const config: QueryConfig = {
  chatsquad: env("CHATSQUAD_API"),
  pricesquad: env("PRICESQUAD_API"),
  dataTarget: ScraperDataTargets.Customer,
  businessStrategy: {
    doc: env("GSHEETS_DOC"),
    sheetNames: {
      discount: env("DISCOUNT_SHEET_NAME")
    }
  }
};

export const ScraperQueue = new ScraperQueueHandler(DB, config);
