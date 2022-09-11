import { Router } from "express";

import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";
import wifiMiddleware from "../middlewares/wifiMiddleware";

import {createWifi, getWifi, deleteWifi} from "../controllers/wifiController"

const wifiRouter = Router();

wifiRouter.post("/wifi", validateTokenMiddleware, wifiMiddleware, createWifi);
wifiRouter.get("/wifi", validateTokenMiddleware, getWifi);
wifiRouter.delete("/wifi/:id", validateTokenMiddleware, deleteWifi)

export default wifiRouter;