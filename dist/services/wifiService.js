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
exports.deleteWifi = exports.getWifi = exports.createWifi = void 0;
const wifiRepository = __importStar(require("./../repositories/wifiRepository"));
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createWifi(title, networkName, password, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassword = encryptPassword(password);
        const wifiInfos = { title, networkName, password: encryptedPassword, userId };
        yield wifiRepository.insert(wifiInfos);
    });
}
exports.createWifi = createWifi;
function encryptPassword(password) {
    const CRYPTRKEY = process.env.CRYPTRKEY || "";
    const cryptr = new cryptr_1.default(CRYPTRKEY);
    const encryptedPassword = cryptr.encrypt(password);
    return encryptedPassword;
}
function getWifi(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNaN(id)) {
            const wifis = yield wifiRepository.getWifiByUserId(userId);
            const decryptedWifiPassword = wifis.map(wifi => {
                const decryptedPassword = decryptPassword(wifi.password);
                return Object.assign(Object.assign({}, wifi), { password: decryptedPassword });
            });
            return decryptedWifiPassword;
        }
        else {
            const wifiById = yield wifiRepository.getWifiById(id);
            if (!wifiById) {
                throw {
                    code: "not found",
                    message: "Id not found"
                };
            }
            if (wifiById.userId !== userId) {
                throw {
                    code: "conflict",
                    message: "This wifi does not belong to this user"
                };
            }
            const decryptedPassword = decryptPassword(wifiById.password);
            const decryptedWifiPassword = Object.assign(Object.assign({}, wifiById), { password: decryptedPassword });
            return decryptedWifiPassword;
        }
    });
}
exports.getWifi = getWifi;
function decryptPassword(password) {
    const cryptr = new cryptr_1.default(process.env.CRYPTRKEY || "");
    const passwordDecrypted = cryptr.decrypt(password);
    return passwordDecrypted;
}
function deleteWifi(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verifyUserIdAndId(userId, id);
        yield wifiRepository.deleteWifi(id);
    });
}
exports.deleteWifi = deleteWifi;
function verifyUserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield wifiRepository.getwifiByuserIdAndId(userId, id);
        if (!wifi) {
            throw {
                code: "unauthorized",
                message: "This wifiNetwork does not extist"
            };
        }
    });
}
