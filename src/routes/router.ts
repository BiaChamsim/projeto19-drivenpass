import { Router } from "express";
import authRouter from "./../routes/authRouter";

const router = Router();

router.use(authRouter);



export default router;