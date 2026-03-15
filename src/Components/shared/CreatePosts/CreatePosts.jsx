import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Textarea,
  Button,
} from "@heroui/react";
import { useContext, useRef } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import { FaImage, FaRegFileImage } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../env/env.environment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function CreatePosts() {
  let { userToken, userData } = useContext(tokenContext);
  let imageFile = useRef();
  let [imageSelected, setSelectedImage] = useState(null);
  const [isUploadedPath, setIsUploadedPath] = useState(false);

  let { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  function handleImagePreview(e) {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setIsUploadedPath(URL.createObjectURL(file));
  }
  function handleRemoveImage() {
    setSelectedImage(null);
    setIsUploadedPath(null);
    imageFile.current.value = "";
  }
  function submitForm(data) {
    const fd = new FormData();
    fd.append("body", data?.body);
    if (imageSelected) {
      fd.append("image", imageSelected);
    }
    mutate(fd);
  }

  async function sendPost(formData) {
    let { data } = await axios.post(`${baseUrl}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data;
  }
  let queryClient = useQueryClient();
  let { mutate } = useMutation({
    mutationFn: sendPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });

      toast.success("Post Created Successfully 👍", {
        closeOnClick: true,
        autoClose: 2000,
      });
      setSelectedImage(null);
      setIsUploadedPath(null);
      reset();
    },
    onError: (error) => {
      console.log(error);
      toast.error("🔴 can't create this post right now... !", {
        closeOnClick: true,
        autoClose: 2000,
      });
    },
  });

  return (
    <>
      <Card className="md:w-150 mx-auto">
        <CardHeader className="flex gap-3">
          <Image
            alt=""
            height={40}
            radius="sm"
            src={userData?.photo}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{userData?.name}</p>
            <p className="text-small text-default-500">{userData?.email}</p>
          </div>
        </CardHeader>
        <Divider />
        <form onSubmit={handleSubmit(submitForm)}>
          <CardBody>
            <Textarea
              {...register("body")}
              placeholder="What's on your mind???"
            />

            {isUploadedPath && (
              <div className="relative mt-2">
                <img
                  alt="preview"
                  className="object-cover rounded-xl"
                  src={isUploadedPath}
                />
                <IoIosCloseCircleOutline
                  onClick={handleRemoveImage}
                  className="absolute top-2.5 end-2.5  text-white cursor-pointer size-7"
                />
              </div>
            )}
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex justify-between w-full items-center gap-3 px-2">
              <Button
                className="bg-sky-50 text-blue-500"
                onClick={() => imageFile.current.click()}
              >
                <FaImage className="cursor-pointer" />
                <input
                  ref={imageFile}
                  type="file"
                  hidden
                  onChange={handleImagePreview}
                />
                choose file
              </Button>
              <Button className="cursor-pointer" color="primary" type="submit">
                Create Post
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
