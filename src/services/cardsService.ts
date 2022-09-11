import * as cardsRepository from "../repositories/cardsRepository";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import {CardType} from "@prisma/client";

dotenv.config();

export async function createCards(title: string, cardNumber: string, ownerName: string, securityCode: string, expirationDate: string, password: string, isVirtual: boolean, cardType: any, userId: number){
    await isTitleRegistered(title, userId)
    const passwordEncrypted = encryptPassword(password)
    const securityCodeEncrypted = encryptSecurityCode(securityCode)

    const cardTypeEnum: CardType = cardType.toUpperCase()

    const cardData = {title, cardNumber, ownerName, securityCode: securityCodeEncrypted, expirationDate, password: passwordEncrypted, isVirtual, cardType: cardTypeEnum, userId}

    await cardsRepository.insert(cardData)
}

async function isTitleRegistered(title: string, userId: number){
    const cardsData = await cardsRepository.getCardsByTitleAndUserId(title, userId)

    if(cardsData){
        throw{
            code: "conflict",
            message: "This title already exists"
        }
    }    
}

function encryptPassword(password: string){
    const CRYPTRKEY: string = process.env.CRYPTRKEY || "";

    const cryptr = new Cryptr(CRYPTRKEY);
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

function encryptSecurityCode(securityCode: string){
    const CRYPTRKEY: string = process.env.CRYPTRKEY || "";

    const cryptr = new Cryptr(CRYPTRKEY);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);

    return encryptedSecurityCode;
}

export async function getCards(userId: number, id: number){

    if(isNaN(id)){

        const cards = await cardsRepository.getCardsByUserId(userId)
        
        const decryptedCardData = cards.map(card => {
            const decryptedPassword = decryptCryptr(card.password)
            const decryptedSecurityCode = decryptCryptr(card.securityCode)
            return {...card, password: decryptedPassword, securityCode: decryptedSecurityCode}
        })

        return decryptedCardData;

    }else{
        const cardById = await cardsRepository.getCardsById(id)

        if(!cardById){
            throw{
                code: "not found",
                message: "Id not found"
            }
        }

        if(cardById.userId !== userId){
            throw{
                code: "conflict",
                message: "This card does not belong to this user"
            }
        }

        const decryptedPassword = decryptCryptr(cardById.password)
        const decryptedSecurityCode = decryptCryptr(cardById.securityCode)
        
        const decryptedCardData = {...cardById, password: decryptedPassword, securityCode: decryptedSecurityCode}

        return decryptedCardData;

    }    
}

function decryptCryptr(encryptedData: string){

    const cryptr = new Cryptr(process.env.CRYPTRKEY || "")
    const cardDataDecrypted = cryptr.decrypt(encryptedData)

    return cardDataDecrypted;
}

export async function deleteCards(userId: number, id: number){ 

    await verifyUserIdAndId(userId, id)

    await cardsRepository.deleteCards(id)
}


async function verifyUserIdAndId(userId:number, id:number){
    const cards = await cardsRepository.getCardsByuserIdAndId(userId, id)

    if(!cards){
        throw{
            code:"unauthorized",
            message:"This card does not extist"
        }
    }
}


