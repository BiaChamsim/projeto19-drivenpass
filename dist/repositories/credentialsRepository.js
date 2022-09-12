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
exports.deleteCredential = exports.getCredentialByuserIdAndId = exports.insert = exports.getCredentialById = exports.getCredentialsByUserId = exports.getCredentialByTitleAndUserId = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getCredentialByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialTitle = yield postgres_1.default.credentials.findFirst({ where: { title, userId } });
        return credentialTitle;
    });
}
exports.getCredentialByTitleAndUserId = getCredentialByTitleAndUserId;
function getCredentialsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialData = yield postgres_1.default.credentials.findMany({ where: { userId } });
        return credentialData;
    });
}
exports.getCredentialsByUserId = getCredentialsByUserId;
function getCredentialById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialId = yield postgres_1.default.credentials.findFirst({ where: { id } });
        return credentialId;
    });
}
exports.getCredentialById = getCredentialById;
function insert(newCredential) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.credentials.create({ data: newCredential });
    });
}
exports.insert = insert;
function getCredentialByuserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialByUserAndId = yield postgres_1.default.credentials.findFirst({ where: { id, userId } });
        return credentialByUserAndId;
    });
}
exports.getCredentialByuserIdAndId = getCredentialByuserIdAndId;
function deleteCredential(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.credentials.delete({ where: { id } });
    });
}
exports.deleteCredential = deleteCredential;
