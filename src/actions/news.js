import { getnews } from "../api/news";

export const getNews = async (param) => {
  try {
    const { data } = await getnews(param);
    return data;
  } catch (error) {
    // toast.error("Something went wrong");
  }
};
