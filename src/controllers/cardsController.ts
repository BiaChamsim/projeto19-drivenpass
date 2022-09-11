import {Request, Response} from "express"; 
import * as cardsService from "./../services/cardsService";

export async function createCards(req: Request, res: Response){
    try{
        const {
            title,
            cardNumber,
            ownerName,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            cardType
        } = req.body;
    
        const userId = res.locals.userId.userId

        await cardsService.createCards(title, cardNumber, ownerName, securityCode, expirationDate, password, isVirtual, cardType, userId)

        res.status(200).send()

    }catch(error: any){
        if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
        console.log(error)
        res.sendStatus(500);
    }
    
}

export async function getCards(req: Request, res: Response){
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.query.id);


        const cards = await cardsService.getCards(userId, id)
        
        res.status(200).send(cards)

    }catch(error: any){
        if(error.code === "not found"){
            return res.status(404).send(error.message)
        }else if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
        console.log(error)
        res.sendStatus(500)
    }
}

export async function deleteCards(req: Request, res: Response){  
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.params.id);
    
        await cardsService.deleteCards(userId, id)
    
        res.sendStatus(200);

    }catch(error: any){
        if(error.code === "unauthorized"){
            return res.status(401).send(error.message)
        }
        console.log(error)
        res.sendStatus(500)
    }
}