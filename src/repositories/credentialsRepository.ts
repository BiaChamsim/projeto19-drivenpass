import prisma from "../databases/postgres";
import {UserCredential} from "../types/credentialsTypes";

export async function getCredentialByTitleAndUserId(title: string, userId: number){
    const credentialTitle = await prisma.credentials.findFirst({where: {title, userId}})
    return credentialTitle
}

export async function getCredentialsByUserId(userId: number){
    const credentialData = await prisma.credentials.findMany({where: {userId}})
    return credentialData
}

export async function getCredentialById(id: number){
    const credentialId = await prisma.credentials.findFirst({where: {id}})
    return credentialId
}

export async function insert(newCredential: UserCredential) {
    await prisma.credentials.create({data: newCredential})
}

export async function getCredentialByuserIdAndId(userId:number,id:number){
    const credentialByUserAndId = await prisma.credentials.findFirst({where:{id, userId}})
    return credentialByUserAndId
}

export async function deleteCredential(id: number){
    await prisma.credentials.delete({where: {id}})
}