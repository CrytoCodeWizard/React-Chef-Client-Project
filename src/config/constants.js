import Axios from "axios";

export const API_URL = process.env.API_URL || "http://localhost:4000";
export const DEFAULT_MESSAGE_TIMEOUT = 3000;

export const axios = Axios.create({
  baseURL: "http://localhost:4000",
  headers: { "X-Custom-Header": "foobar" },
});
