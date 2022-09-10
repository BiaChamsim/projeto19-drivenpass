import { Router } from "express";
import authRouter from "./../routes/authRouter";
import credentialsRouter from "./../routes/credentialsRouter";
import notesRouter from "./../routes/notesRouter";

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(notesRouter);



export default router;