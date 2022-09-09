import { Router } from "express";
import authRouter from "./../routes/authRouter";
import credentialsRouter from "./../routes/credentialsRouter"

const router = Router();

router.use(authRouter);
router.use(credentialsRouter)



export default router;