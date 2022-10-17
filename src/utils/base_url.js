import axios from "axios";

export const BASE_URL = axios.create({
  baseURL: "https://csi-avail-api.dev.walmart.com",
});

export default BASE_URL;
