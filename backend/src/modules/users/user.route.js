import express from "express";
import { getMyProfile } from "./user.controller.js";
import { getUserMiddleware } from "../../middleware/user.middleware.js";

const router = express.Router();

router.get("/getProfile", getUserMiddleware, getMyProfile);

export { router as userRoutes };
