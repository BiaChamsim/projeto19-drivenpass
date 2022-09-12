"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const cardsSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    cardNumber: joi_1.default.string().creditCard().required(),
    ownerName: joi_1.default.string().required(),
    securityCode: joi_1.default.string().length(3).required(),
    expirationDate: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    isVirtual: joi_1.default.boolean().required(),
    cardType: joi_1.default.string().valid('credito', 'debito', 'credito_debito').required()
});
exports.default = cardsSchema;
