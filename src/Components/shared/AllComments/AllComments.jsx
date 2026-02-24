import { baseUrl } from "../../../env/env.environment";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import CommentBody from "../CommentBody/CommentBody";

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
  let { data, isLoading } = useQuery({
    queryFn: getAllComments,
    queryKey: ["allComments"],
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {data?.comments.map((comment) => {
        return (
         <CommentBody comment={comment} postId={post._id}/>
        );
      })}
    </>
  );
}
