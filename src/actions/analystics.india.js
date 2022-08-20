import { getpetroleumdata, getnaturalgas } from "../api/analytics.india";
import { toast } from "react-toastify";

export const getPetroleumData = async () => {
  try {
    const { data } = await getpetroleumdata();
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getNaturalGas = async (req) => {
  try {
    const { data } = await getnaturalgas(req);
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
