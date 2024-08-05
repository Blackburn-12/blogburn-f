import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment, deleteComment } from "../redux/slices/commentSlice";
import Loader from "./Loader";

const Comment = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.user); // Assuming userInfo is in user slice
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Fetching comments for postId:", postId);
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    console.log("Adding comment:", text);
    dispatch(addComment({ postId, text }));
    setText('');
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ postId, commentId }));
  };

  return (
    <div className="comments-section mt-6">
      <h2 className="text-xl font-bold mb-2 ml-4 font-Palanquin">Comments</h2>
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="p-4">
        <form onSubmit={handleAddComment} className="flex flex-col items-center justify-start">
          <textarea
            className="p-2 border w-full bg-loginbox border-buttonBeforeHover rounded-md font-Palanquin"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-buttonBeforeHover mt-4 text-white py-2 px-4 rounded hover:bg-buttonAfterHover font-Palanquin"
          >
            Add Comment
          </button>
        </form>
      </div>

      <div className="p-4 mt-6">
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 mb-4 w-full bg-loginbox border border-buttonBeforeHover rounded-md font-Palanquin"
            >
              <p>{comment.text}</p>
              <p className="text-gray-500 text-sm">- {comment.user?.name}</p>
              {userInfo && userInfo._id === comment.user._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-red-500 mt-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
