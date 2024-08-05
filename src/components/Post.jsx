import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, updatePost, deletePost } from "../redux/slices/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "../redux/slices/userSlice";
import moment from "moment";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import { FiEdit, FiTrash } from "react-icons/fi";
import Comment from "./Comment";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.user); // Assuming you have an auth slice for user data
  const [editMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setUpdatedContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleUpdate = () => {
    if (post) {
      dispatch(updatePost({ ...post, content: updatedContent }))
        .unwrap()
        .then(() => {
          setEditMode(false);
        })
        .catch((error) => {
          console.error("Failed to update post:", error);
        });
    }
  };

  const handleDelete = () => {
    if (post) {
      dispatch(deletePost(post._id))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to delete post:", error);
        });
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-boxtext">{post.title}</h1>
            {userInfo && userInfo._id === post.user?._id && (
              <div className="flex space-x-4">
                <button
                  className="text-buttonBeforeHover hover:text-buttonAfterHover"
                  onClick={handleEdit}
                >
                  <FiEdit size={20} />
                </button>
                <button
                  className="text-buttonBeforeHover hover:text-buttonAfterHover"
                  onClick={handleDelete}
                >
                  <FiTrash size={20} />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-400 mt-2 font-Palanquin">
            Author: {post.user?.name}
          </p>
          <p className="text-gray-400 mt-1 font-Palanquin">
            Created At:{" "}
            {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          {editMode ? (
            <textarea
              className="w-full mt-4 p-2 border rounded"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          ) : (
            <p className="text-gray-700 mt-4 font-Palanquin">{post.content}</p>
          )}
          {post.image && (
            <div className="mt-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover object-center rounded-lg shadow-md"
              />
            </div>
          )}
          {editMode && (
            <button
              className="mt-4 bg-buttonBeforeHover text-white py-2 px-4 rounded hover:bg-buttonAfterHover"
              onClick={handleUpdate}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <Comment postId={id} /> {/* Add the Comment component here */}
      <Footer />
    </>
  );
};

export default Post;
