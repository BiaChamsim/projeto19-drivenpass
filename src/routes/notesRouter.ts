import { Router } from "express";
import noteBodyMiddleware from "./../middlewares/noteBodyMiddleware";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";

import {createNotes, getNotes, deleteNotes} from "../controllers/notesController";

const notesRouter = Router();

notesRouter.post("/notes", noteBodyMiddleware, validateTokenMiddleware, createNotes);
notesRouter.get("/notes", validateTokenMiddleware, getNotes);
notesRouter.delete("/notes/:id", validateTokenMiddleware, deleteNotes)

export default notesRouter;