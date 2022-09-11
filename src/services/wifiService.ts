import * as wifiRepository from "./../repositories/wifiRepository";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

export async function createWifi(title: string, networkName: string, password: string, userId: number){
    const encryptedPassword = encryptPassword(password)
    const wifiInfos = {title, networkName, password: encryptedPassword, userId}
    await wifiRepository.insert(wifiInfos)
}

function encryptPassword(password: string){
    const CRYPTRKEY: string = process.env.CRYPTRKEY || "";

    const cryptr = new Cryptr(CRYPTRKEY);
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

export async function getWifi(userId: number, id: number){

    if(isNaN(id)){

        const wifis = await wifiRepository.getWifiByUserId(userId)
        
        const decryptedWifiPassword = wifis.map(wifi => {
            const decryptedPassword = decryptPassword(wifi.password)
            return {...wifi, password: decryptedPassword}
        })

        return decryptedWifiPassword;

    }else{
        const wifiById = await wifiRepository.getWifiById(id)

        if(!wifiById){
            throw{
                code: "not found",
                message: "Id not found"
            }
        }

        if(wifiById.userId !== userId){
            throw{
                code: "conflict",
                message: "This wifi does not belong to this user"
            }
        }

        const decryptedPassword = decryptPassword(wifiById.password)
        const decryptedWifiPassword = {...wifiById, password: decryptedPassword}

        return decryptedWifiPassword;

    }    
}

function decryptPassword(password: string){

    const cryptr = new Cryptr(process.env.CRYPTRKEY || "")
    const passwordDecrypted = cryptr.decrypt(password)

    return passwordDecrypted
}

export async function deleteWifi(userId: number, id: number){ 

    await verifyUserIdAndId(userId, id)

    await wifiRepository.deleteWifi(id)
}


async function verifyUserIdAndId(userId:number, id:number){
    const wifi = await wifiRepository.getwifiByuserIdAndId(userId, id)

    if(!wifi){
        throw{
            code:"unauthorized",
            message:"This wifiNetwork does not extist"
        }
    }
}
