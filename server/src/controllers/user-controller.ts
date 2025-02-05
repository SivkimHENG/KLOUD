import bcrypt from "bcrypt";
import prisma from "../database";
import { Prisma, User} from "@prisma/client";



export function findUserbyEmail( email :string) {

  return prisma.user.findUnique({
    where : {
      email,
    }
  });
}

export function createUserByEmailAndPassword(user) {

  user.password = bcrypt.hashSync(user.password,12);
  return  prisma.user.create({
    data : user,
  });
}

export function findUserById(id : string) {

  return  prisma.user.findUnique({
    where : {
      id,
    }
  });

}