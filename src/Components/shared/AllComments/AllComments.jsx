import { baseUrl } from "../../../env/env.environment";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Image } from "@heroui/react";
import DropDown from "../DropDown/DropDown";
import { toast } from "react-toastify";


export default function AllComments({ post }) {
  let { userToken } = useContext(tokenContext);
  const queryClient = useQueryClient();

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

  async function deleteMyComment({ postId, commentId }) {
    const { data } = await axios.delete(
      `${baseUrl}/posts/${postId}/comments/${commentId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      },
    );
    return data;
  }

const { mutate: deleteComment } = useMutation({
  mutationFn: deleteMyComment,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["allComments"] });
    toast.success(data?.message);
  },
});

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
          <div key={comment._id} className="flex flex-col space-x-2 w-full">
            <div className="flex justify-between items-center">
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
              <DropDown
                userId={comment?.commentCreator?._id}
                onDelete={() =>
                  deleteComment({
                    postId: post._id,
                    commentId: comment._id,
                  })
                }
              />
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
          </div>
        );
      })}
    </>
  );
}
