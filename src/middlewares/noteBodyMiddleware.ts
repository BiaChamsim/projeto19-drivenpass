import { Request, Response, NextFunction } from "express";
import noteSchema from "../schemas/noteSchema";

export default function credentialMiddleware(req: Request, res: Response, next: NextFunction){

    const {error} = noteSchema.validate(req.body, {abortEarly: false})

    if(error){
        const errors: string[] = error.details.map(err => err.message ) 
        return res.status(422).send(errors)
    }

    next()
}