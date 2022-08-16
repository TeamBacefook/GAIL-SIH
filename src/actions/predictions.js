import { getpredictions } from "../api/predictions";
// import { toast } from "react-toastify";

export const getPredictions = async (csv) => {
  try {
    const { data } = await getpredictions(csv);
    return data;
  } catch (error) {
    // toast.error("Something went wrong");
  }
};
