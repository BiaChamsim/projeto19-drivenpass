import { Request, Response, NextFunction } from "express";
import signUpSchema from "../schemas/authSchema";

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    const {error} = signUpSchema.validate(req.body, {abortEarly: false})

    if(error){
        const errors: string[] = error.details.map(err => err.message ) 
        return res.status(422).send(errors)
    }

    next()
}
