import { Database, AirportLocMap } from "@flight-squad/admin";
import path from "path";

console.log(process.env.NODE_ENV);

Database.init({
  serviceAccount: process.env.FIRESTORE_CONFIG,
  firebaseUrl: process.env.FIREBASE_URL,
  serviceAccountPath: path.resolve(__dirname, "./serviceAccount.json")
});

export const DB = Database.firebase;

console.log(DB);

console.log("gsheets doc", process.env.GSHEETS_DOC);
console.log("airport-loc sheet", process.env.AIRPORT_LOC_SHEET_NAME);

export const LocationIataMap = new AirportLocMap(
  process.env.GSHEETS_DOC,
  process.env.AIRPORT_LOC_SHEET_NAME,
  DB
);
