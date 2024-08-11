import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/slices/postSlice";
import axios from "axios";
import { Footer, Navbar } from "../components/index.js";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { FaImage } from 'react-icons/fa';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = null;
    if (image) {
      imageUrl = await handleImageUpload(image);
    }

    const post = {
      title,
      content,
      image: imageUrl,
    };

    // Dispatch the action and wait for it to finish
    const resultAction = await dispatch(createPost(post));

    if (createPost.fulfilled.match(resultAction)) {
      const createdPost = resultAction.payload;
      // Set a timeout before navigating
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/posts/${createdPost._id}`);
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 mx-auto max-w-xl p-4">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        {loading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="mt-1 flex items-center">
              <label className="flex flex-col items-center p-2 border border-gray-300 rounded-md cursor-pointer">
                <FaImage className="text-gray-500" size={24} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="ml-4 w-32 h-32 object-cover border border-gray-300 rounded-md"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 bg-buttonBeforeHover text-white py-2 px-4 rounded hover:bg-buttonAfterHover ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Post...' : 'Create Post'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;