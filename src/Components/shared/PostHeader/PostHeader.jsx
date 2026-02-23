import { CardHeader, Image } from "@heroui/react";
import DropDown from "../DropDown/DropDown";
import axios from "axios";
import { baseUrl } from "../../../env/env.environment";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function PostHeader({ post, onEdit }) {
  const { userToken } = useContext(tokenContext);
  const queryClient = useQueryClient();

  async function deleteMyPost() {
    const { data } = await axios.delete(`${baseUrl}/posts/${post?._id}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return data;
  }

  const { mutate: deletePost } = useMutation({
    mutationFn: deleteMyPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      toast.success(data?.message);
    },
  });

  return (
    <CardHeader className="flex justify-between gap-3">
      <div className="flex gap-3 items-center">
        <Image
          alt=""
          height={40}
          className="rounded-full"
          src={post?.user.photo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{post?.user.name}</p>
          <p className="text-small text-default-500">
            {post?.createdAt.split("T")[0]}
          </p>
        </div>
      </div>


      <DropDown
        userId={post?.user?._id}
        onEdit={onEdit}
        onDelete={deletePost}
      />
    </CardHeader>
  );
}
