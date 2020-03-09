import Axios from "axios";

const makeDuffelRequestHeaders = accessToken => ({
  "Content-Type": "application/json",
  "Accept-Encoding": "gzip",
  "Duffel-Version": "beta",
  Authorization: `Bearer ${accessToken}`
});

export const DuffelAxios = Axios.create({
  headers: makeDuffelRequestHeaders(process.env.DUFFEL_TOKEN)
});
