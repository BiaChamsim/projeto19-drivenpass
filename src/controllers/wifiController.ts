import {Request, Response} from "express";
import * as wifiService from "./../services/wifiService";


export async function createWifi(req: Request, res: Response){
    try{
        const {title, networkName, password} = req.body;
        const userId = res.locals.userId.userId

        await wifiService.createWifi(title, networkName, password, userId)

        res.status(200).send()

    }catch(error: any){
        if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
        
        console.log(error)
        res.sendStatus(500)
    }

}

export async function getWifi(req: Request, res: Response){
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.query.id);


        const wifi = await wifiService.getWifi(userId, id)
        
        res.status(200).send(wifi)

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

export async function deleteWifi(req: Request, res: Response){  
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.params.id);
    
        await wifiService.deleteWifi(userId, id)
    
        res.sendStatus(200);

    }catch(error: any){
        if(error.code === "unauthorized"){
            return res.status(401).send(error.message)
        }
        console.log(error)
        res.sendStatus(500)
    }
}