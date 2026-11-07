import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/auth/Register.jsx";
import Login from "../components/auth/Login.jsx";
import Home from "../components/Home.jsx";
import CreateBlog from "../components/CreateBlog.jsx";
import BlogByID from "../components/BlogByID.jsx";
import Blogs from "../components/Blogs.jsx";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/create-blog" Component={CreateBlog} />
      <Route path="/blog/:id" Component={BlogByID} />
      <Route path="/user-blog" Component={Blogs} />
    </Routes>
  );
};

export default AppRoute;
