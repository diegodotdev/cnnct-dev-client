import axios from "axios";
import { TPost } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPosts = async () => {
  try {
    const { data }: { data: Promise<TPost[]> } = await axios.get(
      `${BASE_URL}/posts`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id: string) => {
  try {
    const { data }: { data: Promise<TPost> } = await axios.get(
      `${BASE_URL}/posts/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
