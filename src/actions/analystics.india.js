import { getpetroleumdata } from "../api/analytics.india";
// import { toast } from "react-toastify";

export const getPetroleumData = async () => {
  try {
    const { data } = await getpetroleumdata();
    return data;
  } catch (error) {
    // toast.error("Something went wrong");
  }
};
