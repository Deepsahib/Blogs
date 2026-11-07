import express from 'express';
import { loginUser, refreshToken, registerUser } from './auth.controller.js';
import { getUserMiddleware } from '../../middleware/user.middleware.js';
const router=express.Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refresh-token",refreshToken)

export {router as authRoutes}