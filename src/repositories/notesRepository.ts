import prisma from "../databases/postgres";
import { UserNotes } from "../types/notesTypes";

export async function getNotesByTitleAndUserId(title: string, userId: number){
    const credentialTitle = await prisma.notes.findFirst({where: {title, userId}})
    return credentialTitle
}

export async function insert(newNote: UserNotes) {
    await prisma.notes.create({data: newNote})
}
