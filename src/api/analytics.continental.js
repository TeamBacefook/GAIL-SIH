import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/data/continents` });

export const getcontinentaldata = (query) =>
  API.get(`/energy${query}`);
