import {credentials} from "@prisma/client";

export type UserCredential = Omit<credentials, "id">