import {Request , Response, NextFunction} from "express";
import asyncHandler from "express-async-handler";
import jwt ,{JwtPayload}  from "jsonwebtoken";
import prisma from "../database";



export const authenticate = asyncHandler (async(req : Request, res : Response, next : NextFunction ) => {
  try {
    var token = req.cookies.jwt;

    if(!token)  {
      res.status(401);
      throw new Error("Not Authorization");
    }
    const jwtSecret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token,jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      res.status(401)
      throw new Error ("Not Authorization, user id not found")
      }

    const user = await prisma.user.findUnique(decoded.userId, "id username email");
    if (!user) {
      res.status(401)
      throw new Error("Not Authorization, user  not found")
    }

    req.user = user;
    next();


    } catch(error) {
      throw new Error("Not Authorization, Invalid token")

    }

} 
)