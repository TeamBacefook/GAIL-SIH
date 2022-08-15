import { getcountriesdata } from "../api/analytics.india";
import { toast } from "react-toastify";

export const getGlobalData = async (param) => {
  try {
    const { data } = await getcountriesdata(param);
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
