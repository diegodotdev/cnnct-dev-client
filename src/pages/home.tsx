import { useUser } from "@clerk/clerk-react";
import PostWizard from "../components/post-wizard";
import useSWR from "swr";
import { Loader } from "lucide-react";
import axios from "axios";
import Post from "../components/post";
import type { TPost } from "../types";

const fetcher = async (url: string): Promise<TPost[]> =>
  await axios.get(url).then((res) => res.data);

export default function Home() {
  const { user } = useUser();
  const { data, error, isLoading } = useSWR(
    "http://localhost:9090/posts",
    fetcher,
    { refreshInterval: 1000 }
  );

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
