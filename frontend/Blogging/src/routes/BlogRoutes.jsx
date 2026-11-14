import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBlog from "../pages/CreateBlog.jsx";
import BlogByID from "../pages/BlogByID.jsx";
import Blogs from "../pages/Blogs.jsx";

export const BlogRoutes = () => {
   return (
  <Routes>
    <Route path="/create-blog" Component={CreateBlog} />
    <Route path="/blog/:id" Component={BlogByID} />
    <Route path="/user-blog" Component={Blogs} />
  </Routes>
   )
};
