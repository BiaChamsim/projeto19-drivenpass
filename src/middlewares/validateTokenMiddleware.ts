import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config()

export default function validateTokenMiddleware(req: Request, res: Response, next: NextFunction){

    const bearerToken = req.headers.authorization
    const token: string | undefined = bearerToken?.replace("Bearer ", "")

    if(token === undefined){
        return res.send("Token must be provided").status(401)
    }

    try{
        const userId = jwt.verify(token, process.env.JWT_PRIVATE_KEY ?? "")
        res.locals.userId = userId
        next()

    }catch(error){
        console.log("teste")
        res.status(422).send("token is not valid")
    }
}