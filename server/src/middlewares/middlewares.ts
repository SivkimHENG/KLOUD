import { User } from "@prisma/client";
import {Request , Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../database";



export interface CustomRequest extends Request {
  user? : User;
  token? : string;
}

interface DecodedToken{
  id : string

}


export async function isAuthentication(req : CustomRequest, res : Response, next : NextFunction)  {

  try {
    const token = req.header('Authorization')?.replace("Bearer",' ');
    if(!token) {
      throw new Error("Authentication Failed, Missing Token");
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY as string) as DecodedToken;
    const user = await prisma.user.findUnique({
      where : {
        id : decoded.id,
        refreshTokens : token,
      }

    });

    if(!user) {
      throw new Error("Authentication failed , User not found");
    }

    req.user = user;
    req.token = token;
    next();


  } catch(err) {
    res.status(401).send({err : "Authentication failed."});
  }

}
