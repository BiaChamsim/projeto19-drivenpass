"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
function credentialMiddleware(req, res, next) {
    const { error } = credentialSchema_1.default.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(422).send(errors);
    }
    next();
}
exports.default = credentialMiddleware;
