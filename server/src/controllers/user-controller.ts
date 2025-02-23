import bcrypt from "bcrypt";
import prisma  from "../utils/database"
import { Prisma, User} from "@prisma/client";





export  async function findUserById(id: string) : Promise< User | null> {
  try {

    const user = await prisma.user.findUnique({

      where : {
        id  ,
      }

    });
    return user;

  } catch(error) {
    throw new Error ("Unable Find User by ID");

  }

}

export  async function createUserByEmailAndPassword(user : Prisma.UserCreateInput) : Promise<User> {
  try {

    if(!user.email || !user.password) {
      throw new Error ("Email and Password are required");
    }


    const hashPassword =  await bcrypt.hash(user.password, 12);
    const newUser = await prisma.user.create({

      data : {
        ...user,
        password : hashPassword,
      },
    })
    return newUser;
  } catch(error : any) {
    throw new Error(`User created failed : ${error.message}`)
  }
}

export async function findUserbyEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });
    return user;
  } catch (error) {
    console.log("Error find user by Email", error);
    throw new Error("Unable Find User");
  }
}