import { useUser } from "@clerk/clerk-react";
import PostWizard from "../components/post-wizard";
import { Loader } from "lucide-react";
import Post from "../components/post";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../lib/actions";

export default function Home() {
  const { user } = useUser();
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="w-full flex flex-col gap-5 justify-start items-center">
      {user && <PostWizard />}
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
      {data && data.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
}
