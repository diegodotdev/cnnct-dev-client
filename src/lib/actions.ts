import axios from "axios";

export const getPosts = async (url: string) => {
  await axios.get(url).then((res) => res.data);
};
