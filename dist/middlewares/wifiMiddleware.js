"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wifiSchema_1 = __importDefault(require("../schemas/wifiSchema"));
function wifiMiddleware(req, res, next) {
    const { error } = wifiSchema_1.default.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(422).send(errors);
    }
    next();
}
exports.default = wifiMiddleware;
