import axios from "axios";

export const BASE_URL = axios.create({
  baseURL: "http://localhost:5000",
});

export default BASE_URL;
