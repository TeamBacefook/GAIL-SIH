import { getcountriesdata } from "../api/analytics.india";
import { toast } from "react-toastify";

export const getCountriesData = async (param) => {
  try {
    const { data } = await getcountriesdata(param);
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
