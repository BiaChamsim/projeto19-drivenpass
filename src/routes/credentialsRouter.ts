import { Router } from "express";
import credentialMiddleware from "../middlewares/credentialBodyMiddleware"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";

import {createCredential, getCredential, deleteCredentials} from "../controllers/credentialsController";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", credentialMiddleware, validateTokenMiddleware, createCredential)
credentialsRouter.get("/credentials", validateTokenMiddleware, getCredential)
credentialsRouter.delete("/credentials/:id", validateTokenMiddleware, deleteCredentials)

export default credentialsRouter;