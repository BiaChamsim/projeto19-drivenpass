import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware";

import {signUp, signIn} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", authMiddleware, signUp)
authRouter.post("/signin", authMiddleware, signIn)

export default authRouter;