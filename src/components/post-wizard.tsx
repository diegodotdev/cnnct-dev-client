import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import axios from "axios";
import { useState } from "react";

type TBody = {
  userName: string;
  userAvatar: string;
  userId: string;
  content: string;
};

export default function PostWizard() {
  const { user } = useUser();
  const [text, setText] = useState("");
  const { mutate } = useMutation({
    mutationFn: async () => {
      const body: TBody = {
        userId: user?.id as string,
        userName: user?.firstName as string,
        userAvatar: user?.imageUrl as string,
        content: text,
      };
      return axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/posts/add-post`, body)
        .then((res) => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          return res.data;
        })
        .then(() => setText(""));
    },
  });
  return (
    <div className="w-full md:w-4/5 rounded-lg p-4 bg-gray-800 gap-4">
      <textarea
        placeholder="What's on your mind?"
        className="w-full outline-none resize-none h-[100px] bg-transparent text-gray-200"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="w-full flex justify-end items-center">
        <button
          disabled={text.length === 0}
          onClick={() => {
            mutate();
          }}
          className="px-5 py-1 rounded-lg bg-green-400 text-white outline-none disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </div>
  );
}
