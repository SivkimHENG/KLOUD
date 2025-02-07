import {Request , Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticationRequest extends Request {
  payload : JwtPayload

}


export function isAuthentication(req : AuthenticationRequest, res : Response, next : NextFunction)  {
  const { authorization } = req.headers

  if(!authorization) {
    throw new Error ("Unauthorization");
  }


  try {
    const  token = authorization.split(" ")[1];
    var payload = jwt.verify(token,process.env.SECRET_KEY as string) as JwtPayload;
    req.payload = payload;
    next();

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "TokenExpiredError" });

    }
    return res.status(401).json({ error: "Unauthorization" })
  }


}
