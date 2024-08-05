import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updatePost } from "../redux/slices/postSlice"; // Import the updatePost thunk
import { Footer, Navbar } from "../components/index.js";
import Loader from "../components/Loader";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state) => state.posts);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setExistingImage(data.image);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

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
    let imageUrl = existingImage;
    if (image) {
      imageUrl = await handleImageUpload(image);
    }

    const post = {
      _id: id,
      title,
      content,
      image: imageUrl,
    };

    dispatch(updatePost(post)).then(() => {
      navigate(`/posts/${id}`);
    });
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 mx-auto max-w-xl p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
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
            {existingImage && (
              <div className="mb-2">
                <h2 className="text-sm font-medium text-gray-700">Previous Image</h2>
                <img src={existingImage} alt="Existing" className="w-full h-auto object-cover rounded-md" />
              </div>
            )}
            <input
              type="file"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <div className="mt-4">
                <h2 className="text-sm font-medium text-gray-700">New Image</h2>
                <img src={URL.createObjectURL(image)} alt="New" className="w-full h-auto object-cover rounded-md" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 bg-buttonBeforeHover text-white py-2 px-4 rounded hover:bg-buttonAfterHover"
          >
            Update Post
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
