import { useContext,  useState } from "react";
import { useForm } from "react-hook-form";
import { tokenContext } from "../Context/tokenContext";
import { baseUrl } from "../env/env.environment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export function useUpdateComment(postId, commentId, onCloseEdit, defaultContent) {
  const { userToken } = useContext(tokenContext);
  let queryClient = useQueryClient();

  let [imageSelected, setSelectedImage] = useState(null);

  let { register, handleSubmit } = useForm({
    defaultValues: {
      content: defaultContent,
    },
  });

  function submitForm(data) {
    if (!data?.content && !imageSelected) return;
    const fd = new FormData();
    if (data?.content) fd.append("content", data?.content);
    if (imageSelected) fd.append("image", imageSelected);
    updateComment(fd);
  }

  function handleImage(e) {
    setSelectedImage(e.target.files[0]);
  }

  async function updateMyComment(postData) {
    const { data } = await axios.put(
      `${baseUrl}/posts/${postId}/comments/${commentId}`,
      postData,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      },
    );
    return data;
  }

  const { mutate: updateComment, isPending } = useMutation({
    mutationFn: updateMyComment,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });
      onCloseEdit();
      setSelectedImage(null);
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return {
    updateComment,
    register,
    handleSubmit,
    submitForm,
    handleImage,
    imageSelected,
    isPending,
  };
}
