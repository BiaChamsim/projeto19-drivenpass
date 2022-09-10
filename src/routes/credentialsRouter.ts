import { Router } from "express";
import credentialMiddleware from "../middlewares/credentialBodyMiddleware"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";

import {createCredential, getCredential, deleteCredentials} from "../controllers/credentialsController";

const authRouter = Router();

authRouter.post("/credentials", credentialMiddleware, validateTokenMiddleware, createCredential)
authRouter.get("/credentials", validateTokenMiddleware, getCredential)
authRouter.delete("/credentials/:id", validateTokenMiddleware, deleteCredentials)

export default authRouter;