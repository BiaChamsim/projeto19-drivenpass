import {Request, Response} from "express";
import * as credentialsService from "../services/credentialsService"


export async function createCredential(req: Request, res: Response){
    try{
        const {title, url, username, password} = req.body;
        const userId = res.locals.userId.userId;

        await credentialsService.createCredential(title, url, username, userId, password)

        res.sendStatus(201);

    }catch(error: any){
        if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
        console.log(error)
        res.sendStatus(500);
    }
}

export async function getCredential(req: Request, res: Response){
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.query.id);
    
        console.log(id)
        const credentials = await credentialsService.getCredentials(userId, id)

        
        res.status(200).send(credentials)

    }catch(error: any){
        if(error.code === "unprocessable_entity"){
            return res.status(422).send(error.message)
        }else if(error.code === "not found"){
            return res.status(404).send(error.message)
        }else if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
        console.log(error)
        res.sendStatus(500)
    }

}

export async function deleteCredentials(req: Request, res: Response){  
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.params.id);
    
        await credentialsService.deleteCredentials(userId, id)
    
        res.sendStatus(200);

    }catch(error: any){
        if(error.code === "unauthorized"){
            return res.status(401).send(error.message)
        }
        console.log(error)
        res.sendStatus(500)
    }
}