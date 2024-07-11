import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  getAllPosts,
  getAllComments,
  getStatsAndRecentItems,
  deleteComment,
  deleteUser,
  deletePost,
} from "../redux/adminSlice";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import Modal from "../components/Modal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, posts, comments, stats, loading, error } = useSelector(
    (state) => state.admin
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState({
    action: null,
    id: null,
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
    dispatch(getAllComments());
    dispatch(getStatsAndRecentItems());
  }, [dispatch]);

  const handlePostClick = (postId) => {
    navigate(`/post-preview/${postId}`);
  };

  const handleUserClick = (userId) => {
    navigate(`/user-profile/${userId}`);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const openModal = (action, id) => {
    setCurrentAction({ action, id });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentAction({ action: null, id: null });
  };

  const confirmAction = () => {
    if (currentAction.action === "deleteUser") {
      dispatch(deleteUser(currentAction.id));
    } else if (currentAction.action === "deleteComment") {
      dispatch(deleteComment(currentAction.id));
    } else if (currentAction.action === "deletePost") {
      dispatch(deletePost(currentAction.id));
    }
    closeModal();
  };

  const baseUrl = "http://localhost:5000";

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-xl font-semibold animate-pulse'>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className='text-red-600 text-center mt-4 font-medium'>
        Error: {error.message}
      </div>
    );

  return (
    <div className='bg-gradient-to-br from-green-100 to-blue-50 min-h-screen'>
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Stats Display */}
          <div className='bg-white p-4 rounded-lg shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-700 mb-3'>
              Statistics
            </h3>
            <div className='flex justify-around items-center text-center'>
              <div>
                <div className='text-3xl font-bold text-blue-600'>
                  {stats?.totalUsers?.toLocaleString() ?? "Loading..."}
                </div>
                <div className='text-gray-500'>Total Users</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-green-600'>
                  {stats?.totalPosts?.toLocaleString() ?? "Loading..."}
                </div>
                <div className='text-gray-500'>Total Posts</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-pink-600'>
                  {stats?.totalComments?.toLocaleString() ?? "Loading..."}
                </div>
                <div className='text-gray-500'>Total Comments</div>
              </div>
            </div>
          </div>

          {/* Users Display */}
          <div className='col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-700 mb-3'>Users</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {users.map((user) => (
                <div
                  key={user._id}
                  className='flex flex-col items-center relative cursor-pointer'
                  onClick={() => handleUserClick(user._id)}
                >
                  <img
                    className='w-16 h-16 rounded-full'
                    src={`${baseUrl}/${user.imageUrl}`}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <div className='font-medium text-gray-900'>
                    {user.firstName} {user.lastName}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("deleteUser", user._id);
                    }}
                    className='absolute top-0 right-0 text-red-500 hover:text-red-700'
                  >
                    <MdDelete size='20' />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Display */}
          <div className='col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-700 mb-3'>Posts</h3>
            <div className='space-y-4'>
              {posts.map((post) => (
                <div
                  key={post._id}
                  className='relative border-b last:border-b-0 pb-4 mb-4'
                >
                  <div
                    className='flex cursor-pointer'
                    onClick={() => handlePostClick(post._id)}
                  >
                    <img
                      className='w-full md:w-48 h-48 object-cover rounded md:mr-4'
                      src={`${baseUrl}/${post.imageUrl}`}
                      alt={post.title}
                    />
                    <div className='pt-2 flex-grow flex flex-col justify-between'>
                      <div>
                        <div className='text-sm text-gray-500 mb-1'>
                          {formatDate(post.createdAt)} • {post.category}
                        </div>
                        <div className='text-xl font-semibold mb-2'>
                          {post.title}
                        </div>
                        <p className='text-sm text-gray-600 mb-4'>
                          {post.content.substring(0, 100)}...{" "}
                          {/* Show a snippet of the content */}
                        </p>
                      </div>
                      <div className='flex items-center pt-2'>
                        <img
                          className='w-10 h-10 rounded-full mr-2'
                          src={`${baseUrl}/${post.author.imageUrl}`}
                          alt={`${post.author.firstName} ${post.author.lastName}`}
                        />
                        <div>
                          <div className='text-sm font-semibold'>
                            {post.author.firstName} {post.author.lastName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("deletePost", post._id);
                    }}
                    className='absolute top-0 right-0 text-red-500 hover:text-red-700 p-2 rounded-md'
                  >
                    <MdDelete size='24' />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Display */}
          <div className='bg-white p-4 rounded-lg shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-700 mb-3'>
              Comments
            </h3>
            <ul className='divide-y divide-gray-200'>
              {comments.map((comment) => (
                <li key={comment._id} className='py-3'>
                  <div className='text-gray-600 mb-2'>{comment.content}</div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <img
                        src={`${baseUrl}/${comment.author.imageUrl}`}
                        alt='author'
                        className='w-10 h-10 rounded-full mr-2'
                      />
                      <div className='text-gray-600 font-medium'>
                        {comment.author.firstName} {comment.author.lastName}
                      </div>
                    </div>
                    <button
                      onClick={() => openModal("deleteComment", comment._id)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <MdDelete size='20' />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Recent Items Display */}
          <div className='flex flex-col gap-4'>
            {/* Recent Users */}
            <div className='bg-white p-4 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Recent Users
              </h3>
              <ul>
                {stats.recentUsers?.map((user, index, array) => (
                  <li
                    key={user._id}
                    className={`mt-2 flex items-center ${
                      index !== array.length - 1
                        ? "pb-4 mb-4 border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <img
                      src={`${baseUrl}/${user.imageUrl}`}
                      alt={`${user.firstName} ${user.lastName}`}
                      className='w-10 h-10 rounded-full mr-2'
                    />
                    <div className='text-gray-800'>
                      {user.firstName} {user.lastName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Recent Posts
              </h3>
              <ul>
                {stats.recentPosts?.map((post, index, array) => (
                  <li
                    key={post._id}
                    className={`mt-2 ${
                      index !== array.length - 1
                        ? "pb-4 border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className='font-medium'>{post.title}</div>
                    <div className='flex items-center mt-2'>
                      <img
                        src={`${baseUrl}/${post.author.imageUrl}`}
                        alt={`${post.author.firstName} ${post.author.lastName}`}
                        className='w-10 h-10 rounded-full mr-2'
                      />
                      <div className='text-sm text-gray-600'>
                        {post.author.firstName} {post.author.lastName}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg shadow'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                Recent Comments
              </h3>
              <ul>
                {stats.recentComments?.map((comment, index, array) => (
                  <li
                    key={comment._id}
                    className={`mt-2 ${
                      index !== array.length - 1
                        ? "pb-4 mb-4 border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className='flex items-start'>
                      <img
                        src={`${baseUrl}/${comment.author.imageUrl}`}
                        alt={`${comment.author.firstName} ${comment.author.lastName}`}
                        className='w-10 h-10 rounded-full mr-2'
                      />
                      <div>
                        <div className='text-gray-800 font-medium'>
                          "{comment.content}"
                        </div>
                        <div className='mt-1 text-sm font-semibold'>
                          {comment.author.firstName} {comment.author.lastName}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Modal isOpen={modalOpen} onClose={closeModal}>
          <div className='text-center'>
            <h2 className='text-lg font-semibold mb-4'>
              Are you sure you want to delete this item?
            </h2>
            <button
              className='bg-red-500 text-white p-2 rounded-lg mr-2'
              onClick={confirmAction}
            >
              Delete
            </button>
            <button
              className='bg-gray-500 text-white p-2 rounded-lg'
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
