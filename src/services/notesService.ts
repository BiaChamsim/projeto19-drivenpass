import { not } from "joi";
import * as notesRepository from "./../repositories/notesRepository";

export async function createNotes(title: string, description: string, userId: number){
    await isTitleRegistered(title, userId)
    const notesInfos = {title, description, userId}
    await notesRepository.insert(notesInfos)
}

async function isTitleRegistered(title: string, userId: number){
    const notesData = await notesRepository.getNotesByTitleAndUserId(title, userId)

    if(notesData){
        throw{
            code: "conflict",
            message: "This title already exists"
        }
    }
}

export async function getNotes(userId: number, id: number){

    if(isNaN(id)){
        const notes = await notesRepository.getNotesByUserId(userId)
        return notes
    }else{
        const noteById = await notesRepository.getNotesById(id)

        if(!noteById){
            throw{
                code: "not found",
                message: "Id not found"
            }
        }

        if(noteById.userId !== userId){
            throw{
                code: "conflict",
                message: "This note does not belong to this user"
            }
        }

        return noteById

    }
}


export async function deleteNotes(userId: number, id: number){ 

    await verifyUserIdAndId(userId, id)

    await notesRepository.deleteNotes(id)
}


async function verifyUserIdAndId(userId:number, id:number){
    const notes = await notesRepository.getNotesByuserIdAndId(userId, id)

    if(!notes){
        throw{
            code:"unauthorized",
            message:"Não autorizado"
        }
    }
}