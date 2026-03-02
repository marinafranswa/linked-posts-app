import { Textarea, Image, CardBody, Button } from "@heroui/react";
import axios from "axios";
import { baseUrl } from "../../../env/env.environment";
import { useContext, useRef,useState } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaRegFileImage } from "react-icons/fa6";

export default function PostBody({ post, isEdit, onCloseEdit }) {

  const { userToken } = useContext(tokenContext);
  let imageFile = useRef();
  let queryClient = useQueryClient();
  let [imageSelected, setSelectedImage] = useState(null);

  
  let { register, handleSubmit } = useForm({
    defaultValues: {
      body: post?.body || "",
    },
  });

  function submitForm(data) {
    if (!data?.body && !imageSelected) return;
    const fd = new FormData();
      fd.append("body", data?.body);
      fd.append("image", imageSelected);
    mutate(fd);
  }
  function handleImage(e) {
    setSelectedImage(e.target.files[0]);
  }

  async function updateMyPost(postData) {
    const { data } = await axios.put(
      `${baseUrl}/posts/${post?._id}`,
      postData,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      },
    );
    return data;
  }

  const { mutate } = useMutation({
    mutationFn: updateMyPost,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCloseEdit();
      setSelectedImage(null);
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <>
      {!isEdit ? (
        <CardBody>
          <p className="my-3">{post?.body}</p>
          {post?.image ? (
            <Image
              alt=".."
              className="object-cover"
              height={350}
              src={post?.image}
              width={1800}
            />
          ) : null}
        </CardBody>
      ) : (
        <form onSubmit={handleSubmit(submitForm)}>
          <CardBody>
            <Textarea {...register("body")} />
            {post?.image ? (
              <Image
                alt=".."
                className="object-cover"
                height={350}
                src={post?.image}
                width={1800}
              />
            ) : null}
            <div className="flex justify-between gap-2 mt-2">
              <Button color="default" onClick={onCloseEdit}>
                Cancel
              </Button>

              <div>
                <Button
                  className="mx-4 text-sky-500 bg-sky-50"
                  onClick={() => {
                    imageFile.current.click();
                  }}
                >
                  choose a file
                  <FaRegFileImage size={20} />
                </Button>
                <input
                  ref={imageFile}
                  type="file"
                  hidden
                  onChange={handleImage}
                />

                <Button type="submit" color="primary">
                  Save
                </Button>
              </div>
            </div>
          </CardBody>
        </form>
      )}
    </>
  );
}
