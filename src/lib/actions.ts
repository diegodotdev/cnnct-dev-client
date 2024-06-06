import axios from "axios";

export const createPost = async (body: {
  userName: string;
  userAvatar: string;
  userId: string;
  content: string;
}) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/add-post`, body);
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (body: {
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
}) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/posts/add-comment`,
      body
    );
  } catch (error) {
    console.log(error);
  }
};
