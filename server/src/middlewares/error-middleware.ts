import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err : Error,
  req : Request,
  res : Response,
  next : NextFunction

) => {
  console.log(err.stack);
}

if(err instanceof AuthenticationError)a{

}


class AuthenticationError extends Error {
  constructor(message : string) {
    super(message);
    this.name = "AuthenticationError";
  }


  }