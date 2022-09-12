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
exports.deleteCards = exports.getCardsByuserIdAndId = exports.getCardsById = exports.getCardsByUserId = exports.insert = exports.getCardsByTitleAndUserId = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getCardsByTitleAndUserId(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardTitle = yield postgres_1.default.cards.findFirst({ where: { title, userId } });
        return cardTitle;
    });
}
exports.getCardsByTitleAndUserId = getCardsByTitleAndUserId;
function insert(newCard) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.cards.create({ data: newCard });
    });
}
exports.insert = insert;
function getCardsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardsData = yield postgres_1.default.cards.findMany({ where: { userId } });
        return cardsData;
    });
}
exports.getCardsByUserId = getCardsByUserId;
function getCardsById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardsId = yield postgres_1.default.cards.findFirst({ where: { id } });
        return cardsId;
    });
}
exports.getCardsById = getCardsById;
function getCardsByuserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardsByUserAndId = yield postgres_1.default.cards.findFirst({ where: { id, userId } });
        return cardsByUserAndId;
    });
}
exports.getCardsByuserIdAndId = getCardsByuserIdAndId;
function deleteCards(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.cards.delete({ where: { id } });
    });
}
exports.deleteCards = deleteCards;
