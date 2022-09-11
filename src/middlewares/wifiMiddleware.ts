import {Request, Response, NextFunction} from "express";
import wifiSchema from "../schemas/wifiSchema";

export default function wifiMiddleware(req: Request, res: Response, next: NextFunction){
    const {error} = wifiSchema.validate(req.body, {abortEarly: false})

    if(error){
        const errors: string[] = error.details.map(err => err.message ) 
        return res.status(422).send(errors)
    }

    next()
}