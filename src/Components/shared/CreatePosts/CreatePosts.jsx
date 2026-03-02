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
import { FaRegFileImage } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../env/env.environment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CreatePosts() {
  let { userToken, userData } = useContext(tokenContext);
  let imageFile = useRef();
  let [imageSelected, setSelectedImage] = useState(null);

  let { register, handleSubmit,reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  function submitForm(data) {  
      const fd = new FormData()
      fd.append("body", data?.body)
 if (imageSelected) {
   fd.append("image", imageSelected);
    } mutate(fd)
  }

  function handleImage(e) {
      setSelectedImage(e.target.files[0]);
    }
    
  async  function sendPost(formData) {
     let {data} = await axios.post(`${baseUrl}/posts`, formData,{
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
     });
      return data;
    }
    let queryClient = useQueryClient()
    let { mutate } = useMutation({
        mutationFn: sendPost,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
            reset()
            setSelectedImage(null)
            toast.success(data.message)
        }
    })
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
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex justify-between w-full items-center gap-3 px-2">
              <Button className="bg-sky-50 text-blue-500">
                
                <FaRegFileImage
                  size={20}
                  onClick={() => {
                    imageFile.current.click();
                  }}
                />
                <input
                  ref={imageFile}
                  type="file"
                  hidden
                  onChange={handleImage}
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
