import axios from "axios";
import { tokenContext } from "../../Context/tokenContext";
import { useContext} from "react";
import PostCard from "../shared/PostCard/PostCard";
import Loading from "../shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../env/env.environment";

export default function Posts() {
  const { userToken } = useContext(tokenContext);

  async function getAllPosts() {
    const { data } = await axios.get(
      `${baseUrl}/posts`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return data.data
  }
  let { isLoading, data } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["posts"],
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      {data?.posts?.map((post) => {
        return <PostCard post={post} key={post._id} />;
      })}
    </section>
  );
}
