import { getcountriesdata } from "../api/analytics.global";
// import { toast } from "react-toastify";

export const getGlobalData = async (param) => {
  try {
    const { data } = await getcountriesdata(param);
    return data;
  } catch (error) {
    console.log(error);
    // toast.error("Something went wrong");
  }
};
