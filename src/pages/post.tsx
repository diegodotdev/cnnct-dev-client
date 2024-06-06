import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import moment from "moment";
import Comment from "../components/comment";
import CommentWizard from "../components/comment-wizard";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../lib/actions";

export default function Post() {
  const { user } = useUser();
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(id as string),
  });

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
          <div className="w-full md:w-4/5 p-4 bg-gray-800 rounded-lg flex flex-col gap-4">
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
