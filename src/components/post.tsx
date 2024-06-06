import moment from "moment";
import type { TPost } from "../types";
import { Link } from "react-router-dom";

export default function Post(props: TPost) {
  return (
    <Link to={`/${props.id}`} className="w-full md:w-4/5">
      <div className="w-full p-4 bg-gray-800 rounded-lg flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={props.userAvatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-white font-[600]">{props.userName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {moment(props.createdAt).fromNow()}
          </p>
        </div>
        <p className="text-white">{props.content}</p>
      </div>
    </Link>
  );
}
