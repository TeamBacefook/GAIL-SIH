import { getcountriesdata } from "../api/analytics.india";
import { toast } from "react-toastify";
import { getcontinentaldata } from "../api/analytics.continental";

export const getCountriesData = async () => {
  try {
    const { data } = await getcontinentaldata();
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
