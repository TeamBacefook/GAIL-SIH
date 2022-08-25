import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}` });
// const API1 = axios.create({
//   baseURL: `https://takshalimbashia.pythonanywhere.com`,
// });
export const getpredictions = ({ csv, time, ticker, start_date }) =>
  API.post(`/predictions/${ticker}/${time}`, {
    csv: csv,
    start_date: csv.length !== 0 ? start_date : undefined,
  });

export const getpredictionsFn = ({
  csv,
  warIntensity,
  recessionIntensity,
  recessionData,
  warData,
  time,
  ticker,
  start_date,
  pandemicIntensity,
  pandemicData,
}) =>
  API.post(`/predictions/${ticker}/${time}`, {
    csv: csv,
    warData: warData,
    recessionData: recessionData,
    warIntensity: warIntensity,
    recessionIntensity: recessionIntensity,
    pandemicIntensity: pandemicIntensity,
    pandemicData: pandemicData,
    start_date: csv.length !== 0 ? start_date : undefined,
  });
export const getstockdata2 = ({ type, commodityprice }) =>
  API.get(`/getstockdata1?ticker=${commodityprice}&type=${type}`);

export const getmodeleval = () => API.get(`/modelEvals`);
