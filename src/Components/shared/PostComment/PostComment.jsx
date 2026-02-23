import { Input, Image, CardFooter, Divider } from "@heroui/react";
import { Link } from "react-router-dom";
import AllComments from "../AllComments/AllComments";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FaRegFileImage } from "react-icons/fa6";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { tokenContext } from "../../../Context/tokenContext";
import { baseUrl } from "../../../env/env.environment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DropDown from "../DropDown/DropDown";



export default function PostComment({ post, details }) {

  
  let { userToken } = useContext(tokenContext);
  let [selectImage, setImage] = useState(null);
  let inputFile = useRef();

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
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      toast.success(data?.message);
    },
  });


  let { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });
  function getImageFile(e) {
    setImage(e.target.files[0]);
  }

  async function sendData(formData) {
    let { data } = await axios.post(
      `${baseUrl}/posts/${post._id}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return data;
  }
  const queryClient = useQueryClient();

  let { mutate } = useMutation({
    mutationFn: sendData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allComments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });

      reset();
      setImage(null);
      toast.success(data?.message);
    },
  });

 function createPostComment(data) {
    const form = new FormData();
    form.append("content", data?.content);
    if (selectImage) {
      form.append("image", selectImage);
    }
   mutate(form);   
  }
  return (
    <CardFooter className="flex flex-col gap-5">
      <Divider />
      {!details && post?.commentsCount > 0 ? (
        <div className="flex flex-col space-x-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-3 justify-between items-center">
              <img
                src={post?.topComment?.commentCreator?.photo}
                alt={post?.topComment?.commentCreator?.name}
                className="w-6 h-6 rounded-full"
              />
              <p className="text-gray-800 font-semibold">
                {post?.topComment?.commentCreator?.name}
              </p>
            </div>
            <DropDown
              userId={post?.topComment?.commentCreator?._id}
              onDelete={() =>
                deleteComment({
                  postId: post._id,
                  commentId: post.topComment._id,
                })
              }
            />
          </div>
          <div>
            <p className="text-gray-500 text-sm px-9">
              {post?.topComment?.content}
            </p>
            {post?.topComment?.image ? (
              <Image
                alt=".."
                className="object-cover p-2"
                height={350}
                src={post?.topComment?.image}
                width={1800}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <AllComments post={post} />
        // <p>no comments yet</p>
      )}

      <div className="flex flex-col w-full">
        <form onSubmit={handleSubmit(createPostComment)}>
          <Input
            {...register("content")}
            endContent={
              <div className="flex flex-row gap-2">
                <FaRegFileImage
                  className=" cursor-pointer"
                  onClick={() => {
                    inputFile.current.click();
                  }}
                />
                <input
                  ref={inputFile}
                  type="file"
                  onChange={getImageFile}
                  hidden
                />
                <button className="cursor-pointer" type="submit">
                  <IoMdSend />
                </button>
              </div>
            }
            type="text"
            placeholder="Write your comment here"
          />
        </form>
      </div>
      {!details && (
        <Link
          className="ml-2 my-2 text-sky-600 underline"
          to={`/postDetails/` + post?._id}
        >
          View details...
        </Link>
      )}
    </CardFooter>
  );
}
