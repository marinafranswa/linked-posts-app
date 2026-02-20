import {  Card, Divider } from "@heroui/react";
import PostComment from "../PostComment/PostComment";
import PostHeader from "../PostHeader/PostHeader";
import PostBody from "../PostBody/PostBody";
import InteractiveBtns from "../InteractiveBtns/InteractiveBtns";
import { useRef } from "react";

export default function PostCard({ post,isDetails }) {
  let commentBtn = useRef();
  return (
    <>
      <Card className="w-150 mx-auto my-8">
        <PostHeader post={post} />
        <Divider />
        <PostBody post={post} />
        <Divider />

        <div
          className="flex flex-row
          justify-between items-center"
        >
          {post?.likesCount > 1 ? (
            <span className="px-3 py-2">{post?.likesCount} likes</span>
          ) : (
            <span className="px-3 py-2">{post?.likesCount} like</span>
          )}

          {post?.commentsCount > 1 ? (
            <span className="px-3 py-2">{post?.commentsCount} Comments</span>
          ) : (
            <span className="px-3 py-2">{post?.commentsCount} Comment</span>
          )}
        </div>
        <Divider />
        <InteractiveBtns post={post} commentBtn={commentBtn} />

        <PostComment details={isDetails} post={post} commentBtn={commentBtn} />
      </Card>
    </>
  );
}
