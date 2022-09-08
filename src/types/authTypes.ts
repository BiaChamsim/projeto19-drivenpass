import {users} from "@prisma/client";

export type UserAuth = Omit<users, "id">