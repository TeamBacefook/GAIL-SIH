import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}` });

export const getpredictions = (data) =>
  API.post(`/predictions`, {
    csv: data,
  });

export const getmodeleval = () => API.get(`/modelEvals`);
