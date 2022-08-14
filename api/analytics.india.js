import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/data` });

export const getpetroleumdata = () => API.get(`/petroleum/local`);
