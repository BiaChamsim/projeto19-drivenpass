import * as authRepository from "../repositories/authRepository";
import bcrypt from 'bcrypt';
import { UserAuth } from "../types/authTypes";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();


export async function signUp(email: string, password: string){
    await isEmailRegisteredForSignUp(email)
    const encryptedPassword = encryptPassword(password)

    const newUser: UserAuth = {email: email, password: encryptedPassword}

    await authRepository.insert(newUser)
}


async function isEmailRegisteredForSignUp(emailToBeCheck: string){
    const checkEmail = await authRepository.getUserByEmail(emailToBeCheck)

    if(checkEmail){
        throw{
            code:"conflict",
            message:"This email already exists"
        }
    }
} 

function encryptPassword(password: string){    
    const encryptedPassword = bcrypt.hashSync(password, 10)

    return encryptedPassword;
}



export async function signIn(email: string, password: string){
    const userData = await isEmailRegisteredForSignIn(email)
    checkPassword(userData.password, password)
    const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY ?? ""
    const EXPIRATION_TIME: number = 60*30
    const token: string = jwt.sign({userId: userData.id}, JWT_PRIVATE_KEY, {expiresIn: EXPIRATION_TIME})

    return {token}    
}

async function isEmailRegisteredForSignIn(emailToBeCheck: string){
    const checkEmail = await authRepository.getUserByEmail(emailToBeCheck)

    if(!checkEmail){
        throw{
            code:"unauthorized",
            message:"Email or password are not registered"
        }
    }
    return checkEmail
} 

function checkPassword(dbPassword: string, password: string){

    const isValidPassword = bcrypt.compareSync(password, dbPassword)

    if(isValidPassword !== true){
        throw{
            code: "unauthorized",
            message: "Email or password are not registered"
        }
    }
}

