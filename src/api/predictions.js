import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}` });

export const getpredictions = (data) =>
  API.post(`/predictions/csv/upload`, data);
