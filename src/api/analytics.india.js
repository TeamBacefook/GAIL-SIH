import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/data` });

export const getpetroleumdata = () => API.get(`/petroleum/local`);
export const getnaturalgas = ({
  start_month,
  start_year,
  end_month,
  end_year,
}) =>
  API.get(
    `/naturalgas/local?startmonth=${start_month}&startyear=${start_year}&endmonth=${end_month}&endyear=${end_year}`
  );
