import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../redux/postSlice";
import { categories } from "../components/Categories";

const CreatePost = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // This will be plain text
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content); // Assuming content is plain text
    formData.append("author", currentUser.id);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await dispatch(createNewPost(formData)).unwrap();
      toast.success("Post created successfully!");
      navigate(`/post-preview/${result._id}`); // Use the actual ID of the created post
    } catch (error) {
      toast.error("Failed to create post: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mb-6'>Create New Post</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700'
          >
            Content
          </label>
          <textarea
            id='content'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            rows='4'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor='category'
            className='block text-sm font-medium text-gray-700'
          >
            Category
          </label>
          <select
            id='category'
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700'
          >
            Image
          </label>
          <input
            type='file'
            id='image'
            className='mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer'
            onChange={handleImageChange}
          />
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
