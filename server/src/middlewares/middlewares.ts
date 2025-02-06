import {Request , Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function isAuthentication(req : Request, res : Response, next : NextFunction) {

    const { authorization }  = req.headers.authorization;

  if (!authorization) {
    res.status(400)
    throw new Error(" Unauthorization");
  }


  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY as string);
    (req as any).payload = payload;

  } catch (error) {
    res.status(401);
    if(error?.name === "TokenExpireError") {
      throw new Error (error.name);
    }
    throw new Error ("Unauthorization");

  }

  return next();

}