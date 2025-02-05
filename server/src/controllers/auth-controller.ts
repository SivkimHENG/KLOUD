import {Request , Response } from "express";
import prisma from "../database";
import { clearToken, generateToken } from "../utils/auth";
import hashToken from "../utils/hashToken";



export async function registerUser(req : Request, res : Response) { 


  const { username , email, password } =  req.body;
  const userExist = await prisma.user.findUnique({ email : req.body.email });
    
  if(userExist) {
    res.status(400).json({ message : "User have already exist"});
  }


  const user = await prisma.user.create({
    data : {
      username , email, password
    }
  });


  if (user) {
    generateToken(res,user.id);
    res.json(201).json({
      id : user.id,
      username : user.username,
      email : user.email,
    });
  } else {
    res.status(400).json({ message : "An error occured in creating new user"})
  }

}

export async function authenticateUser(req : Request, res : Response) { 

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({email});

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user.id);
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(401).json({ message: "User not found / password incorrect" })
  }

}

export function logoutUser(req : Request, res : Response) {

  clearToken(res);
  res.json(201).json({message : "User logged out "})

 }


function addRefreshTokenToWhitelist({ refreshToken  , userId}) {
  return prisma.refreshToken.create ({
    data : {

      hashedToken : hashToken(refreshToken),
      userId,
      expireAt : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },

  });
}



function findRefreshToken(token : string) {

  return prisma.refreshToken.findUnique({
    where : {
      hashedToken : hashToken(token),

    },
  });
}
