import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/predictions` });

export const getpredictions = (data) =>
  API.post(`/csv/upload`, {
    csv: data,
  });
