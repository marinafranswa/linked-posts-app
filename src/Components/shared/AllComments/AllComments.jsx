import { baseUrl } from "../../../env/env.environment";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Image } from "@heroui/react";

export default function AllComments({ post }) {
let { userToken } = useContext(tokenContext);

  async function getAllComments() {
      const { data } = await axios.get(
        `${baseUrl}/posts/${post._id}/comments?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      return data.data;
    }
  let {data,isLoading}=  useQuery({
        queryFn: getAllComments,
        queryKey:["allComments"]
  })

    
if (isLoading) {
    return <Loading/>
    }

    
  return (
    <>
          {data?.comments.map((comment) => {
     return   <div key={comment._id} className="flex flex-col space-x-2 w-full">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={comment?.commentCreator?.photo}
              alt={comment?.commentCreator?.name}
              className="w-6 h-6 rounded-full"
            />
            <p className="text-gray-800 font-semibold">
              {comment?.commentCreator?.name}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm px-9">{comment?.content}</p>
            {comment?.image ? (
              <Image
                alt=".."
                className="object-cover p-2"
                height={350}
                src={comment?.image}
                width={1800}
              />
            ) : null}
          </div>
        </div>;
      })}
    </>
  );
}
