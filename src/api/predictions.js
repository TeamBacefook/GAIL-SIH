import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}` });
// const API1 = axios.create({
//   baseURL: `https://takshalimbashia.pythonanywhere.com`,
// });
export const getpredictions = (data) =>
  API.post(`/predictions`, {
    csv: data,
  });
export const getstockdata2 = () => API.get("/getstockdata");

export const getmodeleval = () => API.get(`/modelEvals`);
