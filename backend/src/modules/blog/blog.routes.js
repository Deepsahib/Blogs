import express from 'express';
import { createBlog, deleteUserBlogs, getAllBlogs, getBlogById, getUserBlogs, updateBlog } from './blog.controller.js';
import upload from '../../config/multer.js';
import { getUserMiddleware } from '../../middleware/user.middleware.js';
const router=express();

router.post("/create",upload.single("imageUrl"),getUserMiddleware,createBlog);
router.get("/all",getAllBlogs);
router.get("/user",getUserMiddleware,getUserBlogs);
router.post("/edit/:id",updateBlog);
router.get("/:id",getBlogById);
router.delete("/delete/:id",deleteUserBlogs);


export {router as blogroutes};