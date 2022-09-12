"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authSchema_1 = __importDefault(require("../schemas/authSchema"));
function authMiddleware(req, res, next) {
    const { error } = authSchema_1.default.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(422).send(errors);
    }
    next();
}
exports.default = authMiddleware;
