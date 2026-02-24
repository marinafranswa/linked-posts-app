import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { tokenContext } from "../Context/tokenContext";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../env/env.environment";

export function useDeleteComment(postId) {
  const { userToken } = useContext(tokenContext);
  let queryClient = useQueryClient();

  async function deleteMyComment(commentId) {
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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });

      toast.success(data?.message);
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return { deleteComment };
}
