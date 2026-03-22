import { Router } from 'express';

const authController = require("../controller/auth.controller.js");
const authRouter = Router();

// POST /api/auth/register
authRouter.post("/register", authController.register);

export default authRouter;