import { Image,CardBody } from "@heroui/react";



export default function PostBody({post}) {
  return (

      <CardBody>
        <p className="my-3">{post.body}</p>
        {post.image ? (
          <Image
            alt=".."
            className="object-cover"
            height={350}
            src={post?.image}
            width={1800}
          />
        ) : null}
      </CardBody>
   
  );
}
