import {
  getpredictions,
  getmodeleval,
  getstockdata2,
} from "../api/predictions";
import { toast } from "react-toastify";

export const getPredictions = async (csv, warIntensity, recessionIntensity) => {
  try {
    const { data } = await getpredictions(
      csv,
      warIntensity,
      recessionIntensity
    );
    console.log(data);
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

export const getStockData2 = async (formdata) => {
  try {
    const { data } = await getstockdata2(formdata);
    return data.data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};
