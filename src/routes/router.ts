import { Router } from "express";
import authRouter from "./../routes/authRouter";
import credentialsRouter from "./../routes/credentialsRouter";
import notesRouter from "./../routes/notesRouter";
import cardsRouter from "./cardsRouter";
import wifiRouter from "./wifiRouter";

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(cardsRouter);
router.use(wifiRouter)



export default router;