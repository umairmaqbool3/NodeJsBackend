import { Router } from 'express';
import * as authController from "../Controllers/auth.controller.js";

const authRouter = Router();

// POST /api/auth/register
authRouter.post("/register", authController.register);

// GET /api/auth/get-me
authRouter.get("/get-me", authController.getMe);

// GET /refresh-token
authRouter.get("/refresh-token", authController.refreshToken);

// GET /logout
authRouter.get("/logout", authController.logout);

export default authRouter;