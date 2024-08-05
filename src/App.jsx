import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreatePost,
  EditPost,
  Home,
  Login,
  PostDetail,
  Register,
} from "./pages";
import Post from "./components/Post";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
