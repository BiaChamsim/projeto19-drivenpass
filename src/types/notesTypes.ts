import {notes} from "@prisma/client";

export type UserNotes = Omit<notes, "id">