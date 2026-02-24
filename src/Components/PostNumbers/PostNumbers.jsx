
export default function PostNumbers({post}) {
  return (
    <>
    
      <div
        className="flex flex-row
          justify-between items-center px-2"
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
    </>
  );
}
