import {
  getpredictions,
  getmodeleval,
  getstockdata2,
  getpredictionsFn,
} from "../api/predictions";
import { toast } from "react-toastify";

export const getPredictions = async ({ csv, time, ticker, start_date }) => {
  console.log(time);
  try {
    const { data } = await getpredictions({ csv, time, ticker, start_date });
    console.log(data);
    return data;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const getPredictionsFn = async ({
  csv,
  warIntensity,
  recessionIntensity,
  warData,
  recessionData,
  ticker,
  time,
  start_date,
}) => {
  try {
    const { data } = await getpredictionsFn({
      csv,
      warIntensity,
      recessionIntensity,
      warData,
      recessionData,
      time,
      ticker,
      start_date,
    });
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
