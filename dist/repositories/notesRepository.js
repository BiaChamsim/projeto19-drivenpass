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
exports.deleteNotes = exports.getNotesByuserIdAndId = exports.getNotesById = exports.getNotesByUserId = exports.insert = exports.getNotesByTitleAndUserId = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getNotesByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialTitle = yield postgres_1.default.notes.findFirst({ where: { title, userId } });
        return credentialTitle;
    });
}
exports.getNotesByTitleAndUserId = getNotesByTitleAndUserId;
function insert(newNote) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.notes.create({ data: newNote });
    });
}
exports.insert = insert;
function getNotesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const notesData = yield postgres_1.default.notes.findMany({ where: { userId } });
        return notesData;
    });
}
exports.getNotesByUserId = getNotesByUserId;
function getNotesById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const notesId = yield postgres_1.default.notes.findFirst({ where: { id } });
        return notesId;
    });
}
exports.getNotesById = getNotesById;
function getNotesByuserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const notesByUserAndId = yield postgres_1.default.notes.findFirst({ where: { id, userId } });
        return notesByUserAndId;
    });
}
exports.getNotesByuserIdAndId = getNotesByuserIdAndId;
function deleteNotes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.notes.delete({ where: { id } });
    });
}
exports.deleteNotes = deleteNotes;
