import {Request, Response} from "express";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response){
    try{
        const {email, password} = req.body;

        await authService.signUp(email, password)

        res.sendStatus(201);

    }catch(error: any){
        if(error.code === "conflict"){
            return res.status(409).send(error.message)
        }
    }
}

export async function signIn(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        const token = await authService.signIn(email, password)

        res.send(token).status(200)
        
    }catch(error: any){
        if(error.code === "unauthorized"){
            return res.status(401).send(error.message)
        }
    }
}

