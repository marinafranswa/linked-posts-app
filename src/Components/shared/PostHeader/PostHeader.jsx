import { CardHeader,Image } from '@heroui/react';


export default function PostHeader({post}) {
  return (
   
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          className="rounded-full"
          src={post.user.photo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{post.user.name}</p>
          <p className="text-small text-default-500">
            {post.createdAt.split("T")[0]}
          </p>
        </div>
      </CardHeader>
  
  );
}
