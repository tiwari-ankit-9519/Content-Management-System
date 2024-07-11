import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  fetchAllPosts,
  fetchPostById,
  selectAllPosts,
  selectPostById,
} from "../redux/postSlice";
import Comments from "../components/Comment";

const baseUrl = "http://localhost:5000";

const PostPreviewPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostById(postId));
    dispatch(fetchAllPosts());
  }, [dispatch, postId]);

  const post = useSelector((state) => selectPostById(state, postId));
  const posts = useSelector(selectAllPosts);
  const recentPosts = posts.slice(0, 5);
  const recommendedPosts = posts
    .filter((p) => p._id !== postId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const words = post?.content.split(" ");
  const isLongContent = words && words.length > 100;
  const firstHalfContent = isLongContent
    ? words.slice(0, 100).join(" ")
    : post?.content;
  const secondHalfContent = isLongContent ? words.slice(100).join(" ") : "";

  const postImageUrl = post?.imageUrl
    ? `${baseUrl}/${post.imageUrl.replace(/\\/g, "/")}`
    : "";
  const authorImageUrl = post?.author?.imageUrl
    ? `${baseUrl}/${post.author.imageUrl.replace(/\\/g, "/")}`
    : "";

  // Ensure the image has a fixed size
  const imageStyle = {
    maxHeight: "150rem",
    maxWidth: "100%",
    objectFit: "cover",
  };

  return (
    <div
      className='container mx-auto mt-10 flex flex-wrap'
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className='w-full lg:w-2/3 pr-4'>
        <h1 className='text-4xl font-bold mb-2'>{post?.title}</h1>
        <div className='flex items-center mb-4'>
          <img
            src={authorImageUrl || "path/to/default/author/image.png"}
            alt='Author'
            className='w-12 h-12 rounded-full object-cover'
          />
          <p className='text-sm text-gray-600 ml-4'>
            {post?.createdAt && format(new Date(post.createdAt), "PPP")}
            {`, by ${post?.author?.firstName} ${post?.author?.lastName}`}
          </p>
        </div>
        <div className='prose lg:prose-xl max-w-none'>
          {!isLongContent && post?.imageUrl && (
            <img src={postImageUrl} alt='Post' style={imageStyle} />
          )}
          <p>{firstHalfContent}</p>
          {isLongContent && post?.imageUrl && (
            <img src={postImageUrl} alt='Post' style={imageStyle} />
          )}
          {isLongContent && <p>{secondHalfContent}</p>}
        </div>
        <Comments postId={postId} postAuthorId={post?.author?._id} />
      </div>
      <div className='w-full lg:w-1/3 pl-4 mt-10 lg:mt-0'>
        <div className='mb-8'>
          <h2 className='text-xl font-bold mb-2'>Recent Posts</h2>
          {recentPosts.map((p) => (
            <Link
              to={`/post-preview/${p._id}`}
              key={p._id}
              className='block text-blue-600 hover:underline'
            >
              {p.title}
            </Link>
          ))}
        </div>
        <div>
          <h2 className='text-xl font-bold mb-2'>Recommended Posts</h2>
          {recommendedPosts.map((p) => (
            <Link
              to={`/post-preview/${p._id}`}
              key={p._id}
              className='block text-blue-600 hover:underline'
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPreviewPage;
