"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const authRepository = __importStar(require("../repositories/authRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isEmailRegisteredForSignUp(email);
        const encryptedPassword = encryptPassword(password);
        const newUser = { email: email, password: encryptedPassword };
        yield authRepository.insert(newUser);
    });
}
exports.signUp = signUp;
function isEmailRegisteredForSignUp(emailToBeCheck) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkEmail = yield authRepository.getUserByEmail(emailToBeCheck);
        if (checkEmail) {
            throw {
                code: "conflict",
                message: "This email already exists"
            };
        }
    });
}
function encryptPassword(password) {
    const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
    return encryptedPassword;
}
function signIn(email, password) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield isEmailRegisteredForSignIn(email);
        checkPassword(userData.password, password);
        const JWT_PRIVATE_KEY = (_a = process.env.JWT_PRIVATE_KEY) !== null && _a !== void 0 ? _a : "";
        const EXPIRATION_TIME = 60 * 30;
        const token = jsonwebtoken_1.default.sign({ userId: userData.id }, JWT_PRIVATE_KEY, { expiresIn: EXPIRATION_TIME });
        return { token };
    });
}
exports.signIn = signIn;
function isEmailRegisteredForSignIn(emailToBeCheck) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkEmail = yield authRepository.getUserByEmail(emailToBeCheck);
        if (!checkEmail) {
            throw {
                code: "unauthorized",
                message: "Email or password are not registered"
            };
        }
        return checkEmail;
    });
}
function checkPassword(dbPassword, password) {
    const isValidPassword = bcrypt_1.default.compareSync(password, dbPassword);
    if (isValidPassword !== true) {
        throw {
            code: "unauthorized",
            message: "Email or password are not registered"
        };
    }
}
