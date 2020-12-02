import Axios from "axios";

export const API_URL = process.env.API_URL || "https://chef-available-server.herokuapp.com";
export const DEFAULT_MESSAGE_TIMEOUT = 3000;

export const axios = Axios.create({
  baseURL: "https://chef-available-server.herokuapp.com",
  headers: { "X-Custom-Header": "foobar" },
});
