"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const wifiSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    networkName: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.default = wifiSchema;
