import {cards} from "@prisma/client";

export type UserCards = Omit<cards, "id">