import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { Plus } from "lucide-react";

type TBody = {
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
};

export default function CommentWizard({ postId }: { postId: string }) {
  const { user } = useUser();
  const [text, setText] = useState("");
  const { mutate } = useMutation({
    mutationFn: async () => {
      const body: TBody = {
        postId: postId,
        userId: user?.id as string,
        userName: user?.firstName as string,
        userAvatar: user?.imageUrl as string,
        content: text,
      };
      return axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/posts/add-comment`, body)
        .then((res) => {
          queryClient.invalidateQueries({ queryKey: ["post"] });
          return res.data;
        })
        .then(() => setText(""));
    },
  });
  return (
    <div className="w-full md:w-4/5 bg-gray-800 px-5 py-2 flex justify-between items-center rounded-lg">
      <input
        type="text"
        className="w-full outline-none bg-transparent text-white"
        placeholder="Comment"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        className="bg-green-400 disabled:opacity-50 p-2 rounded-md text-white"
        disabled={text.length === 0}
        onClick={() => mutate()}
      >
        <Plus size="10px" />
      </button>
    </div>
  );
}
