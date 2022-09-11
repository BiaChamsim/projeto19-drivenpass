import {Router} from "express";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";
import cardsMiddleware from "../middlewares/cardsMiddleware";

import {createCards, getCards, deleteCards} from "../controllers/cardsController";


const cardsRouter = Router()

cardsRouter.post("/cards", validateTokenMiddleware, cardsMiddleware, createCards);
cardsRouter.get("/cards", validateTokenMiddleware, getCards);
cardsRouter.delete("/cards/:id", validateTokenMiddleware, deleteCards)

export default cardsRouter;