import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getPostsAndCommentsByUser,
  deletePost,
  deleteComment,
  updateComment,
} from "../redux/adminSlice";
import { format } from "date-fns";

const PostandComments = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, posts, comments, loading, error } = useSelector(
    (state) => state.admin
  );
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(getPostsAndCommentsByUser(userId));
    }
  }, [dispatch, userId]);

  const handleDeletePost = async (postId) => {
    await dispatch(deletePost(postId));
  };

  const handleEditPost = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setCommentContent(comment.content);
  };

  const handleUpdateComment = async () => {
    if (editingCommentId && commentContent.trim() !== "") {
      await dispatch(
        updateComment({
          id: editingCommentId,
          commentData: { content: commentContent },
        })
      );
      setEditingCommentId(null);
      setCommentContent("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId));
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PP");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePostClick = (postId) => {
    navigate(`/post-preview/${postId}`);
  };

  const user = users.find((user) => user._id === userId);

  if (!user) {
    return <div>User not found.</div>;
  }

  const baseUrl = "http://localhost:5000";

  return (
    <div className='container mx-auto my-4 p-4 min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-lg flex items-center space-x-6'>
        <img
          src={user.image || `${baseUrl}/${user.imageUrl}`}
          alt='User'
          className='w-24 h-24 rounded-full'
        />
        <div className='flex-grow'>
          <p className='text-2xl font-semibold'>{user.username}</p>
          <p className='text-sm text-gray-600'>Email: {user.email}</p>
          <p className='text-sm text-gray-600'>DOB: {formatDate(user.dob)}</p>
          <p className='text-sm text-gray-600'>Gender: {user.gender}</p>
          <p className='text-sm text-gray-600'>Address: {user.address}</p>
          <p className='text-sm text-gray-600'>Phone: {user.phoneNumber}</p>
        </div>
      </div>

      <div className='flex flex-wrap mt-8 -mx-4'>
        <div className='w-full lg:w-1/2 px-4 mb-4 lg:mb-0'>
          <h3 className='text-xl font-semibold mb-3'>Posts</h3>
          {posts.map((post) => (
            <div
              key={post._id}
              className='bg-white border rounded-lg p-4 shadow-lg flex items-center my-2'
              onClick={() => handlePostClick(post._id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`${baseUrl}/${post.imageUrl}`}
                alt='Post'
                className='w-16 h-16 mr-4 rounded-md object-cover'
              />
              <div className='flex-grow'>
                <p className='text-md font-semibold'>{post.title}</p>
                <p className='text-sm text-gray-600'>
                  {post.content.substring(0, 100)}...
                </p>
              </div>
              <MdEdit
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditPost(post._id);
                }}
                className='cursor-pointer text-blue-500 mr-2'
                size='1.5em'
              />
              <MdDelete
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePost(post._id);
                }}
                className='cursor-pointer text-red-500'
                size='1.5em'
              />
            </div>
          ))}
        </div>

        <div className='w-full lg:w-1/2 px-4'>
          <h3 className='text-xl font-semibold mb-3'>Comments</h3>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className='bg-white border rounded-lg p-4 shadow-lg flex justify-between items-center my-2'
            >
              {editingCommentId === comment._id ? (
                <>
                  <input
                    type='text'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className='flex-grow border rounded p-2 text-md'
                  />
                  <button
                    onClick={handleUpdateComment}
                    className='ml-2 text-green-500'
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className='text-md flex-grow'>{comment.content}</p>
                  <MdEdit
                    onClick={() => handleEditComment(comment)}
                    className='cursor-pointer text-blue-500 mr-2'
                    size='1.5em'
                  />
                  <MdDelete
                    onClick={() => handleDeleteComment(comment._id)}
                    className='cursor-pointer text-red-500'
                    size='1.5em'
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostandComments;
