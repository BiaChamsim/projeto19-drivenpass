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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotes = exports.getNotes = exports.createNotes = void 0;
const notesRepository = __importStar(require("./../repositories/notesRepository"));
function createNotes(title, description, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isTitleRegistered(title, userId);
        const notesInfos = { title, description, userId };
        yield notesRepository.insert(notesInfos);
    });
}
exports.createNotes = createNotes;
function isTitleRegistered(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const notesData = yield notesRepository.getNotesByTitleAndUserId(title, userId);
        if (notesData) {
            throw {
                code: "conflict",
                message: "This title already exists"
            };
        }
    });
}
function getNotes(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNaN(id)) {
            const notes = yield notesRepository.getNotesByUserId(userId);
            return notes;
        }
        else {
            const noteById = yield notesRepository.getNotesById(id);
            if (!noteById) {
                throw {
                    code: "not found",
                    message: "Id not found"
                };
            }
            if (noteById.userId !== userId) {
                throw {
                    code: "conflict",
                    message: "This note does not belong to this user"
                };
            }
            return noteById;
        }
    });
}
exports.getNotes = getNotes;
function deleteNotes(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verifyUserIdAndId(userId, id);
        yield notesRepository.deleteNotes(id);
    });
}
exports.deleteNotes = deleteNotes;
function verifyUserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const notes = yield notesRepository.getNotesByuserIdAndId(userId, id);
        if (!notes) {
            throw {
                code: "unauthorized",
                message: "Não autorizado"
            };
        }
    });
}
