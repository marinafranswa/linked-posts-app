import axios from "axios";
import { useContext, useRef, useState } from "react";
import { baseUrl } from "../../env/env.environment";
import { tokenContext } from "../../Context/tokenContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody } from "@heroui/react";
import { FaRegFileImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ChangeProfilePic() {
  const { userToken } = useContext(tokenContext);
  let profileImage = useRef();
  let [imageSelected, setSelectedImage] = useState(null);
  let navigate = useNavigate();
  let { handleSubmit } = useForm({
    defaultValues: {},
  });

  function submitForm() {
    const formData = new FormData();

    formData.append("photo", imageSelected);
    mutate(formData);
  }
  function handleImage(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function updateMyProfilePic(postData) {
    const { data } = await axios.put(
      `${baseUrl}/users/upload-photo`,
      postData,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      },
    );
    return data;
  }
  let queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateMyProfilePic,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
   queryClient.invalidateQueries({ queryKey: ["posts"] });
   queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
   queryClient.invalidateQueries({ queryKey: ["allComments"] });
   queryClient.invalidateQueries({ queryKey: ["singlePost"] });
      setSelectedImage(null);
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <>
      <h1 className="font-semibold text-slate-900 text-2xl pb-5">
        Change Profile picture:
      </h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit(submitForm)}>
          <CardBody>
            <div className="flex justify-between gap-2 mt-2">
              <Button color="default" onClick={() => navigate("/")}>
                Cancel
              </Button>

              <div>
                <Button
                  className="mx-4 text-sky-500 bg-sky-50"
                  onClick={() => {
                    profileImage?.current.click();
                  }}
                >
                  choose a file
                  <FaRegFileImage size={20} />
                </Button>
                <input
                  ref={profileImage}
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
      </Card>
    </>
  );
}
