import { Prisma } from "@prisma/client";
import db from "../utils/database"
import bcrypt from "bcrypt"




export function createUserByEmail(user : Prisma.UserCreateInput  ) {
    const hashPassword = bcrypt.hashSync(user.password,12);
    return db.user.create({
        data : {
            ...user,
        },
    });
}



export function findUserById(id : string)  {

    return db.user.findUnique({
       where : {
            id  
        }

    });

}


export function findUserByEmail(email : string)  {

    return db.user.findUnique({
        where : {
            email,
        }
    });
}


