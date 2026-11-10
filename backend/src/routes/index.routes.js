import express from 'express';
import { blogroutes } from '../modules/blog/blog.routes.js';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { userRoutes } from '../modules/users/user.route.js';
const router=express.Router();



router.use("/blog",blogroutes)
router.use("/auth",authRoutes)
router.use("/user",userRoutes)


export {router as indexRoutes};