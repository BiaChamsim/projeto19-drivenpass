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
exports.deleteCards = exports.getCards = exports.createCards = void 0;
const cardsRepository = __importStar(require("../repositories/cardsRepository"));
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createCards(title, cardNumber, ownerName, securityCode, expirationDate, password, isVirtual, cardType, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isTitleRegistered(title, userId);
        const passwordEncrypted = encryptPassword(password);
        const securityCodeEncrypted = encryptSecurityCode(securityCode);
        const cardTypeEnum = cardType.toUpperCase();
        const cardData = { title, cardNumber, ownerName, securityCode: securityCodeEncrypted, expirationDate, password: passwordEncrypted, isVirtual, cardType: cardTypeEnum, userId };
        yield cardsRepository.insert(cardData);
    });
}
exports.createCards = createCards;
function isTitleRegistered(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardsData = yield cardsRepository.getCardsByTitleAndUserId(title, userId);
        if (cardsData) {
            throw {
                code: "conflict",
                message: "This title already exists"
            };
        }
    });
}
function encryptPassword(password) {
    const CRYPTRKEY = process.env.CRYPTRKEY || "";
    const cryptr = new cryptr_1.default(CRYPTRKEY);
    const encryptedPassword = cryptr.encrypt(password);
    return encryptedPassword;
}
function encryptSecurityCode(securityCode) {
    const CRYPTRKEY = process.env.CRYPTRKEY || "";
    const cryptr = new cryptr_1.default(CRYPTRKEY);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);
    return encryptedSecurityCode;
}
function getCards(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNaN(id)) {
            const cards = yield cardsRepository.getCardsByUserId(userId);
            const decryptedCardData = cards.map(card => {
                const decryptedPassword = decryptCryptr(card.password);
                const decryptedSecurityCode = decryptCryptr(card.securityCode);
                return Object.assign(Object.assign({}, card), { password: decryptedPassword, securityCode: decryptedSecurityCode });
            });
            return decryptedCardData;
        }
        else {
            const cardById = yield cardsRepository.getCardsById(id);
            if (!cardById) {
                throw {
                    code: "not found",
                    message: "Id not found"
                };
            }
            if (cardById.userId !== userId) {
                throw {
                    code: "conflict",
                    message: "This card does not belong to this user"
                };
            }
            const decryptedPassword = decryptCryptr(cardById.password);
            const decryptedSecurityCode = decryptCryptr(cardById.securityCode);
            const decryptedCardData = Object.assign(Object.assign({}, cardById), { password: decryptedPassword, securityCode: decryptedSecurityCode });
            return decryptedCardData;
        }
    });
}
exports.getCards = getCards;
function decryptCryptr(encryptedData) {
    const cryptr = new cryptr_1.default(process.env.CRYPTRKEY || "");
    const cardDataDecrypted = cryptr.decrypt(encryptedData);
    return cardDataDecrypted;
}
function deleteCards(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verifyUserIdAndId(userId, id);
        yield cardsRepository.deleteCards(id);
    });
}
exports.deleteCards = deleteCards;
function verifyUserIdAndId(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield cardsRepository.getCardsByuserIdAndId(userId, id);
        if (!cards) {
            throw {
                code: "unauthorized",
                message: "This card does not extist"
            };
        }
    });
}
