"use strict";
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
exports.deleteWifi = exports.getwifiByuserIdAndId = exports.getWifiById = exports.getWifiByUserId = exports.insert = exports.getWifisByTitleAndUserId = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getWifisByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialTitle = yield postgres_1.default.wifiNetworks.findFirst({ where: { title, userId } });
        return credentialTitle;
    });
}
exports.getWifisByTitleAndUserId = getWifisByTitleAndUserId;
function insert(newWifi) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.wifiNetworks.create({ data: newWifi });
    });
}
exports.insert = insert;
function getWifiByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiData = yield postgres_1.default.wifiNetworks.findMany({ where: { userId } });
        return wifiData;
    });
}
exports.getWifiByUserId = getWifiByUserId;
function getWifiById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiId = yield postgres_1.default.wifiNetworks.findFirst({ where: { id } });
        return wifiId;
    });
}
exports.getWifiById = getWifiById;
function getwifiByuserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiByUserAndId = yield postgres_1.default.wifiNetworks.findFirst({ where: { id, userId } });
        return wifiByUserAndId;
    });
}
exports.getwifiByuserIdAndId = getwifiByuserIdAndId;
function deleteWifi(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.wifiNetworks.delete({ where: { id } });
    });
}
exports.deleteWifi = deleteWifi;
