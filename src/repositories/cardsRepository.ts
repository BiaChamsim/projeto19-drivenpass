import prisma from "../databases/postgres";
import { UserCards } from "../types/cardsType";


export async function getCardsByTitleAndUserId(title: string, userId: number){
    const cardTitle = await prisma.cards.findFirst({where: {title, userId}})
    return cardTitle
}

export async function insert(newCard: UserCards) {
    await prisma.cards.create({data: newCard})
}

export async function getCardsByUserId(userId: number){
    const cardsData = await prisma.cards.findMany({where: {userId}})
    return cardsData
}

export async function getCardsById(id: number){
    const cardsId = await prisma.cards.findFirst({where: {id}})
    return cardsId
}

export async function getCardsByuserIdAndId(userId:number,id:number){
    const cardsByUserAndId = await prisma.cards.findFirst({where:{id, userId}})
    return cardsByUserAndId
}

export async function deleteCards(id: number){
    await prisma.cards.delete({where: {id}})
}