import Cryptr from "cryptr";
import * as credentialsRepository from "../repositories/credentialsRepository";
import dotenv from "dotenv";

dotenv.config()

export async function createCredential(title: string, url: string, username: string, userId: number, password: string){
    await verifyTitleRegister(title, userId)
    const encryptedPassword = cryptrPassword(password)
    const credentialInfos = {title, url, username, userId, password: encryptedPassword}
   
    await credentialsRepository.insert(credentialInfos)
}

async function verifyTitleRegister(title: string, userId: number){
    const isTitleRegistered = await credentialsRepository.getCredentialByTitleAndUserId(title, userId)

    if(isTitleRegistered){
        throw{
            code: "conflict",
            message: "This title already exists"
        }
    }
}

function cryptrPassword(password: string){

    const CRYPTRKEY: string = process.env.CRYPTRKEY || "";

    const cryptr = new Cryptr(CRYPTRKEY);
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}


export async function getCredentials(userId: number, id: number){

    if(isNaN(id)){
        const credentials = await credentialsRepository.getCredentialsByUserId(userId)

        const decryptedCredential = credentials.map(credential => {

            const decryptedPassword = decryptPassword(credential.password)
            return {...credential, password: decryptedPassword}

        })

        return decryptedCredential
    }else{
        //TODO: buscar credenciais pelo id dela mesma
        const credentialById = await credentialsRepository.getCredentialById(id)

        if(!credentialById){
            throw{
                code: "not found",
                message: "Id not found"
            }
        }

        if(credentialById.userId !== userId){
            throw{
                code: "not found",
                message: "User not found"
            }
        }

        const decryptedPassword = decryptPassword(credentialById.password)

        const decryptedCredencial = {...credentialById, password: decryptedPassword}

        return decryptedCredencial
    }


}

function decryptPassword(password: string){

    const cryptr = new Cryptr(process.env.CRYPTRKEY || "")
    const passwordDecrypted = cryptr.decrypt(password)

    return passwordDecrypted
}



