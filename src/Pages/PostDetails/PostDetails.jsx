import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { tokenContext } from "../../Context/tokenContext";
import PostCard from "../../Components/shared/PostCard/PostCard";
import Loading from "../../Components/shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../env/env.environment";

export default function PostDetails() {
  let { id } = useParams();
  const { userToken } = useContext(tokenContext);

  async function getSinglePost() {
    const { data } = await axios.get(
      `${baseUrl}/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return data;
  }
  let { data, isLoading } = useQuery({
    queryFn: getSinglePost,
    queryKey: ["singlePost", id],
    select:(data)=>data.data.post
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PostCard isDetails={true} post={data} />
    </>
  );
}
