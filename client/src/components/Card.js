import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { selectPostById } from "../redux/postSlice";

const Card = ({ postId }) => {
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, postId));
  const baseUrl = "http://localhost:5000";

  if (!post) {
    return <div className='flex justify-center'>Post not found</div>;
  }

  const formattedDate = format(new Date(post.createdAt), "MMM dd, yyyy");
  const postImageUrl = post.imageUrl
    ? `${baseUrl}/${post.imageUrl.replace(/\\/g, "/")}`
    : "path/to/default/image.jpg"; // Fallback for default image

  const goToPostPreview = () => {
    navigate(`/post-preview/${postId}`);
  };

  return (
    <div
      onClick={goToPostPreview}
      className='flex flex-col rounded overflow-hidden shadow-lg cursor-pointer relative bg-white min-h-80'
    >
      <img src={postImageUrl} alt='Post' className='w-full h-48 object-cover' />
      <div className='p-6 flex flex-col flex-grow'>
        <h3 className='text-lg font-semibold mb-2'>{post.title}</h3>
        <p className='text-gray-700 text-sm flex-grow'>
          {post.content.substring(0, 100)}...
        </p>
        <div className='flex items-center mt-4'>
          <img
            className='w-10 h-10 rounded-full mr-4'
            src={
              post.author && post.author.imageUrl
                ? `${baseUrl}/${post.author.imageUrl.replace(/\\/g, "/")}`
                : "path/to/default/author.jpg"
            } // Fallback for default author image
            alt='Author'
          />
          <div className='text-sm'>
            <p className='text-gray-900 leading-none'>
              {post.author?.firstName} {post.author?.lastName}
            </p>
            <p className='text-gray-600'>{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
