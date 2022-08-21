import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}` });
// const API1 = axios.create({
//   baseURL: `https://takshalimbashia.pythonanywhere.com`,
// });
export const getpredictions = (data, warIntensity, recessionIntensity) =>
  API.post(`/predictions`, {
    csv: data,
    warIntensity: warIntensity,
    recessionIntensity: recessionIntensity,
  });
export const getstockdata2 = ({ type, commodityprice }) =>
  API.get(`/getstockdata1?ticker=${commodityprice}&type=${type}`);

export const getmodeleval = () => API.get(`/modelEvals`);
