import {Request, Response, NextFunction} from "express";
import cardsSchema from "../schemas/cradsSchema";

export default function cardsMiddleware(req: Request, res: Response, next: NextFunction){
    const {error} = cardsSchema.validate(req.body, {abortEarly: false})

    if(error){
        const errors: string[] = error.details.map(err => err.message ) 
        return res.status(422).send(errors)
    }

    next()
}