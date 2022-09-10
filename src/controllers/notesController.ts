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

export async function getNotes(req: Request, res: Response){
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.query.id);
    
        const notes = await notesService.getNotes(userId, id)
        
        res.status(200).send(notes)


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

export async function deleteNotes(req: Request, res: Response){  
    try{
        const userId = res.locals.userId.userId;
        const id: number = Number(req.params.id);
    
        await notesService.deleteNotes(userId, id)
    
        res.sendStatus(200);

    }catch(error: any){
        if(error.code === "unauthorized"){
            return res.status(401).send(error.message)
        }
        res.sendStatus(500)
    }
}