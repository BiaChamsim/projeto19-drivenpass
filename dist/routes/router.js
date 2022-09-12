"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./../routes/authRouter"));
const credentialsRouter_1 = __importDefault(require("./../routes/credentialsRouter"));
const notesRouter_1 = __importDefault(require("./../routes/notesRouter"));
const cardsRouter_1 = __importDefault(require("./cardsRouter"));
const wifiRouter_1 = __importDefault(require("./wifiRouter"));
const router = (0, express_1.Router)();
router.use(authRouter_1.default);
router.use(credentialsRouter_1.default);
router.use(notesRouter_1.default);
router.use(cardsRouter_1.default);
router.use(wifiRouter_1.default);
exports.default = router;
