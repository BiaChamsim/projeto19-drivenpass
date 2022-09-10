import prisma from "../databases/postgres";
import { UserNotes } from "../types/notesTypes";

export async function getNotesByTitleAndUserId(title: string, userId: number){
    const credentialTitle = await prisma.notes.findFirst({where: {title, userId}})
    return credentialTitle
}

export async function insert(newNote: UserNotes) {
    await prisma.notes.create({data: newNote})
}

export async function getNotesByUserId(userId: number){
    const notesData = await prisma.notes.findMany({where: {userId}})
    return notesData
}

export async function getNotesById(id: number){
    const notesId = await prisma.notes.findFirst({where: {id}})
    return notesId
}

export async function getNotesByuserIdAndId(userId:number,id:number){
    const notesByUserAndId = await prisma.notes.findFirst({where:{id, userId}})
    return notesByUserAndId
}

export async function deleteNotes(id: number){
    await prisma.notes.delete({where: {id}})
}