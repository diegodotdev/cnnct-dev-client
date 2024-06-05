import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import type { TPost } from "../types";
import { Loader } from "lucide-react";
import moment from "moment";
import Comment from "../components/comment";
import CommentWizard from "../components/comment-wizard";
import { useUser } from "@clerk/clerk-react";

const fetcher = async (url: string): Promise<TPost> =>
  await axios.get(url).then((res) => res.data);

export default function Post() {
  const { user } = useUser();
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `http://localhost:9090/posts/${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  return (
    <div className="w-full flex flex-col gap-5 justify-start items-center">
      {isLoading && (
        <div className="w-full py-10 grid place-items-center">
          <Loader size="15px" className="animate-spin" />
        </div>
      )}
      {error && (
        <div className="w-full py-10 flex flex-col gap-2">
          <p>Something went wrong</p>
          <button className="bg-red-400 rounded-lg outline-none text-white px-5 py-1">
            Refresh page
          </button>
        </div>
      )}
      {data && (
        <>
          <div className="w-4/5 p-4 bg-gray-800 rounded-lg flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={data.userAvatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-white font-[600]">{data.userName}</p>
              </div>
              <p className="text-sm text-gray-500">
                {moment(data.createdAt).fromNow()}
              </p>
            </div>
            <p className="text-white">{data.content}</p>
          </div>
          {user && <CommentWizard postId={id as string} />}
          {data?.comments?.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </>
      )}
    </div>
  );
}
