import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/data` });

export const getcountriesdata = ({ country, start_year, end_year }) =>
  API.get(
    `/countries?startyear=${start_year}&endyear=${end_year}&country=${country}`
  );
