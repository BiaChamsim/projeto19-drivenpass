import prisma from "../databases/postgres";
import { UserWifi } from "../types/wifiTypes";

export async function getWifisByTitleAndUserId(title: string, userId: number){
    const credentialTitle = await prisma.wifiNetworks.findFirst({where: {title, userId}})
    return credentialTitle
}

export async function insert(newWifi: UserWifi) {
    await prisma.wifiNetworks.create({data: newWifi})
}

export async function getWifiByUserId(userId: number){
    const wifiData = await prisma.wifiNetworks.findMany({where: {userId}})
    return wifiData
}

export async function getWifiById(id: number){
    const wifiId = await prisma.wifiNetworks.findFirst({where: {id}})
    return wifiId
}

export async function getwifiByuserIdAndId(userId:number,id:number){
    const wifiByUserAndId = await prisma.wifiNetworks.findFirst({where:{id, userId}})
    return wifiByUserAndId
}

export async function deleteWifi(id: number){
    await prisma.wifiNetworks.delete({where: {id}})
}