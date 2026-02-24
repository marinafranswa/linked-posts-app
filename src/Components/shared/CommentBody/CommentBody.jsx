import { useRef, useState } from "react";
import { useDeleteComment } from "../../../Hooks/useDeleteComment";
import { useUpdateComment } from "../../../Hooks/useUpdateComment";
import DropDown from "../DropDown/DropDown";
import { Button,  Image,  Textarea } from "@heroui/react";
import { FaRegFileImage } from "react-icons/fa";
import Loading from "../Loading/Loading";

export default function CommentBody({ comment, postId }) {
  let imageFile = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const { deleteComment } = useDeleteComment(postId);
const { register, handleSubmit, submitForm, handleImage,isPending } = useUpdateComment(
  postId,
  comment?._id,
  () => setIsEdit(false),
  comment?.content,
    );
      if (isPending) {
        return <Loading />;
      }
  return (
    <>
      <div className="flex flex-col space-x-2 w-full">
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
            onDelete={() => deleteComment(comment?._id)}
            onEdit={() => setIsEdit(true)}
          />
        </div>

        {isEdit ? (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-2 px-9 mt-2">
              <Textarea
                {...register("content")}
                defaultValue={comment?.content}
              />
              {comment?.image && (
                <Image
                  alt=".."
                  className="object-cover p-2"
                  height={350}
                  src={comment?.image}
                  width={1800}
                />
              )}
              <div className="flex items-center justify-between mt-3">
                <Button color="default" onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
                <div className="flex items-center">
                  <Button
                    className="mx-4 text-sky-500 bg-sky-50"
                    onClick={() => {
                      imageFile.current.click();
                    }}
                  >
                    <input
                      ref={imageFile}
                      type="file"
                      hidden
                      onChange={handleImage}
                    />
                    <FaRegFileImage size={20} /> choose file
                  </Button>

                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-gray-500 text-sm px-9">{comment?.content}</p>
            {comment?.image && (
              <Image
                alt=".."
                className="object-cover p-2"
                height={350}
                src={comment?.image}
                width={1800}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
