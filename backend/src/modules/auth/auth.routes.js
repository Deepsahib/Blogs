import express from 'express';
import { forgotPassword, loginUser, refreshToken, registerUser } from './auth.controller.js';
const router=express.Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refresh-token",refreshToken)
router.post("/forgot-password",forgotPassword)

export {router as authRoutes}