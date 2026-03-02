import {  Card, Divider } from "@heroui/react";
import PostComment from "../PostComment/PostComment";
import PostHeader from "../PostHeader/PostHeader";
import PostBody from "../PostBody/PostBody";
import InteractiveBtns from "../InteractiveBtns/InteractiveBtns";
import { useState } from "react";
import PostNumbers from "../../PostNumbers/PostNumbers"

export default function PostCard({ post, isDetails }) {
    const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Card className="w-70 md:w-150 mx-auto my-8">
        <PostHeader post={post} onEdit={() => setIsEdit(true)} />
        <Divider />
        <PostBody
          isEdit={isEdit}
          post={post}
          onCloseEdit={() => setIsEdit(false)}
        />
        <Divider />
        {!isEdit && (
          <>
            <PostNumbers post={post} />
            <Divider />
            <InteractiveBtns post={post} />
            <PostComment details={isDetails} post={post} />
          </>
        )}
      </Card>
    </>
  );
}
