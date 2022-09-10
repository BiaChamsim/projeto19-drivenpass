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
