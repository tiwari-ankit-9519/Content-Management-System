import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../redux/adminSlice";
import { toast } from "react-toastify";

const PostEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.admin);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Assuming your post object has a title and content

  useEffect(() => {
    if (postId) {
      const post = posts.find((post) => post._id === postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      } else {
        dispatch(getPostById(postId));
      }
    }
  }, [dispatch, postId, posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    await dispatch(updatePost({ id: postId, postData: { title, content } }));
    toast.success("Post updated successfully");
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='container mx-auto mt-10'>
      <div className='max-w-lg mx-auto shadow p-6 bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='content'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Content
            </label>
            <textarea
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              rows='4'
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostEdit;
