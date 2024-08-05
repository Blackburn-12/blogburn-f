// components/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postSlice';
import { Link } from 'react-router-dom';
import { Loader, Navbar, Footer } from '../components';
import moment from 'moment'; // Import moment.js for date formatting

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6 max-w-4xl mx-auto mt-16">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center"
          >
            <img
              src={post.image}
              alt={post.title}
              className="object-cover h-72 w-72 rounded-md mr-8"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-Palanquin mb-2 text-boxtext">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">
                {post.content.substring(0, 100)}...
              </p>
              <p className="text-gray-400 font-Palanquin">Author: {post.user?.name}</p>
              <p className="text-gray-400 font-Palanquin">
                Created At: {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default Home;
