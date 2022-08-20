import {
  getpredictions,
  getmodeleval,
  getstockdata2,
} from "../api/predictions";
import { toast } from "react-toastify";

export const getPredictions = async (csv) => {
  try {
    const { data } = await getpredictions(csv);
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getModelEval = async () => {
  try {
    const { data } = await getmodeleval();
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getStockData2 = async () => {
  try {
    const { data } = await getstockdata2();
    return data.data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
