import {wifiNetworks} from "@prisma/client";

export type UserWifi = Omit<wifiNetworks, "id">