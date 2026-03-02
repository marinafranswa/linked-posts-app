import { Button } from "@heroui/react";
import axios from "axios";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { tokenContext } from "../../../Context/tokenContext";
import { baseUrl } from "../../../env/env.environment";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function InteractiveBtns({ post }) {
  let { userToken } = useContext(tokenContext);
  let [isLiked, setLiked] = useState(null);
  async function toggleLikes() {
    let { data } = await axios.put(
      `${baseUrl}/posts/${post._id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return data.data;
  }

  let queryClient = useQueryClient();
  let { mutate, isPending, reset } = useMutation({
    mutationFn: toggleLikes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });
      setLiked(data?.liked);
      reset();
    },
  });
  function likePost() {
    mutate();
  }
  return (
    <>
      <div className="flex flex-row justify-evenly items-center pt-3 px-2 gap-2">
        <Button
          isDisabled={isPending}
          onClick={() => {
            likePost();
          }}
          className="flex items-center w-full"
        >
          {isLiked ? <BiSolidLike className="text-sky-600" /> : <BiLike />}
          Like
        </Button>
        <Button className="flex items-center w-full">
          <FaRegComment /> Comment
        </Button>

      </div>
    </>
  );
}
