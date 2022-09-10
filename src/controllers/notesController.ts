import {Request, Response} from "express";
import * as notesService from "./../services/notesService";


export async function createNotes(req: Request, res: Response){
    try{
        const {title, description} = req.body;
        const userId = res.locals.userId.userId

        await notesService.createNotes(title, description, userId)

        res.status(200).send()

    }catch(error: any){
        if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
        
        console.log(error)
        res.sendStatus(500)
    }

}