"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function validateTokenMiddleware(req, res, next) {
    var _a;
    const bearerToken = req.headers.authorization;
    const token = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.replace("Bearer ", "");
    if (token === undefined) {
        return res.send("Token must be provided").status(401);
    }
    try {
        const userId = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PRIVATE_KEY) !== null && _a !== void 0 ? _a : "");
        res.locals.userId = userId;
        next();
    }
    catch (error) {
        console.log("teste");
        res.status(422).send("token is not valid");
    }
}
exports.default = validateTokenMiddleware;
