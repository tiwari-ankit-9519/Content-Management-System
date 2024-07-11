import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, selectAllPosts } from "../redux/postSlice";
import Card from "../components/Card";
import { categories } from "../components/Categories";

const HomePage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  useEffect(() => {
    let posts = allPosts;

    if (searchTerm) {
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(posts);
  }, [searchTerm, selectedCategory, allPosts]);

  return (
    <div className='container mx-auto p-4 min-h-screen'>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search by title...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border rounded py-2 px-3 mr-4'
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='border rounded py-2 px-3'
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredPosts.map((post) => (
          <Card key={post._id} postId={post._id} />
        ))}
      </div>
      {filteredPosts.length === 0 && <p>No posts found.</p>}
    </div>
  );
};

export default HomePage;
