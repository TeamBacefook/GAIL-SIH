import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}` });

export const getnews = (param = "natural gas") =>
  API.get(`/news?search=${param}`);
