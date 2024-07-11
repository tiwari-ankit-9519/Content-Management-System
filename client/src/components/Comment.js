import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import {
  createCommentAsync,
  deleteCommentAsync,
  fetchAllCommentsForPostAsync,
} from "../redux/commentSlice";
import Modal from "./Modal";
import { toast } from "react-toastify";

const Comments = ({ postId, postAuthorId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const comments = useSelector((state) => state.comments.comments);
  const status = useSelector((state) => state.comments.status);
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    dispatch(fetchAllCommentsForPostAsync(postId));
  }, [dispatch, postId]);

  const handlePostComment = async () => {
    if (newComment.trim()) {
      try {
        await dispatch(
          createCommentAsync({ postId, content: newComment })
        ).unwrap();
        setNewComment("");
        toast.success("Comment Created");
        dispatch(fetchAllCommentsForPostAsync(postId));
      } catch (error) {
        toast.error("Failed to create comment");
      }
    }
  };

  const handleDeleteClick = (commentId) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(true);
  };

  const handleDeleteComment = async () => {
    try {
      await dispatch(deleteCommentAsync(selectedCommentId)).unwrap();
      toast.success("Comment Deleted");
      dispatch(fetchAllCommentsForPostAsync(postId));
    } catch (error) {
      toast.error("Failed to delete comment");
    } finally {
      setIsModalOpen(false);
    }
  };

  const isAuthorOrPostOwner = (commentAuthorId, postAuthorId) =>
    currentUser?.id === commentAuthorId || currentUser?.id === postAuthorId;
  return (
    <div className='p-4 bg-white shadow rounded-lg space-y-4'>
      <h3 className='text-lg font-semibold'>Comments</h3>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='Write a comment...'
          rows='3'
          className='shadow border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
        <button
          onClick={handlePostComment}
          className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Post Comment
        </button>
      </div>
      {status === "loading" && <p>Loading comments...</p>}
      <div className='space-y-2'>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className='bg-gray-100 p-3 rounded-lg relative'
          >
            <div className='flex items-center space-x-2'>
              <img
                src={
                  comment.author.imageUrl
                    ? `${baseUrl}/${comment.author.imageUrl.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "path/to/default/image.png"
                }
                alt='Author'
                className='w-8 h-8 rounded-full'
              />
              <span className='font-semibold'>
                {comment.author.firstName} {comment.author.lastName}
              </span>
              <span className='text-xs text-gray-500'>
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className='mt-2 text-gray-800'>{comment.content}</p>
            {isAuthorOrPostOwner(comment.author._id, postAuthorId) && (
              <button
                onClick={() => handleDeleteClick(comment._id)}
                className='absolute top-2 right-2 text-red-500'
                aria-label='Delete comment'
              >
                <AiOutlineDelete size='1.5em' />
              </button>
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className='text-lg font-semibold mb-4'>Confirm Deletion</h3>
        <p>Are you sure you want to delete this comment?</p>
        <div className='mt-4 flex justify-end space-x-3'>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Comments;
