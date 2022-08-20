import { getcountriesdata, getglobaltrends } from "../api/analytics.global";
import { toast } from "react-toastify";

export const getGlobalData = async (param) => {
  try {
    const { data } = await getcountriesdata(param);
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getGlobalTrends = async () => {
  try {
    const{ data }= await getglobaltrends();
    return data
  } catch (error) {
    toast.error("Something went wrong");
  }
};
