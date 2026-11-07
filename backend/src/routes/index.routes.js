import express from 'express';
import { blogroutes } from '../modules/blog/blog.routes.js';
import { authRoutes } from '../modules/auth/auth.routes.js';
const router=express.Router();



router.use("/blog",blogroutes)
router.use("/auth",authRoutes)


export {router as indexRoutes};