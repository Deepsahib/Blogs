import express from 'express';
import { createBlog, deleteUserBlogs, getAllBlogs, getBlogById, getUserBlogs, likeUserBlog, updateBlog } from './blog.controller.js';
import upload from '../../config/multer.js';
import { getUserMiddleware } from '../../middleware/user.middleware.js';
const router=express();

router.post("/create",upload.single("imageUrl"),getUserMiddleware,createBlog);
router.get("/all",getUserMiddleware,getAllBlogs);
router.get("/user",getUserMiddleware,getUserBlogs);
router.post("/edit/:id",updateBlog);
router.get("/:id",getBlogById);
router.delete("/delete/:id",deleteUserBlogs);
router.post("/like/:id",likeUserBlog);


export {router as blogroutes};