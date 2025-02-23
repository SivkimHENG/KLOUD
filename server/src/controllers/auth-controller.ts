import {NextFunction, Request , Response } from "express";
import hashToken from "../utils/hashToken";
import { createUserByEmailAndPassword, findUserById , findUserbyEmail} from "./user-controller";
import { generateAccessToken, generateTokens } from "../utils/jwt";
import bcrypt from "bcrypt";
import prisma from "../utils/database";



export async function registerUser(req : Request, res : Response, next : NextFunction ) { 


  try {
  const {email, password } =  req.body;
  if(!email || !password ) {
    res.status(400)
    throw new Error ("You must provide Email and Password !!")
  }
  const existUser = await findUserbyEmail(email);
  if(existUser) {
    res.status(400)
    throw new Error ("The Email has already taken ")
  }

    const user = await createUserByEmailAndPassword({ email, password });
    const { accessToken, refreshToken } = generateTokens(user);
    await addRefreshTokenToWhitelist({ refreshToken, userId: user.id });

    res.json(
      {
        accessToken,
        refreshToken,
      }
    );

  } catch (error) {
    next(error);
  }


}

export async function authenticateUser(req : Request, res : Response, next : NextFunction) { 

  const { email, password } = req.body;
  try {
  const {email, password } =  req.body;
  if(!email || !password ) {
    res.status(400)
    throw new Error ("You must provide Email and Password !!")
  }
  const existUser = await findUserbyEmail(email) ;
  if(!existUser) {
    res.status(400)
    throw new Error ("Credential incorrect")
  }

  const validPassword = await bcrypt.compare(password,existUser?.password);

  if (!validPassword) {
    res.status(403)
    throw new Error ("Credential incorrect");
  }

  const { accessToken, refreshToken} = generateTokens(existUser);
  await addRefreshTokenToWhitelist({refreshToken, userId : existUser.id})

    res.json({
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(error);
  }

}

export async function profileUser(req : Request, res : Response, next : NextFunction) {

  try {


  } catch (err) {
    next(err);
  }

}

export async function refreshTokenUser(req : Request, res : Response, next : NextFunction ) {

  try{
    const { refreshToken } = req.body

    if(!refreshToken) {
      res.status(400)
      throw new Error("Missing the refresh token");
    }

    const savedFreshToken = await findRefreshToken(refreshToken);


    if (!savedFreshToken ||
      savedFreshToken.revoked === true ||
      Date.now() >= savedFreshToken.expireAt.getTime()) {
      res.status(400);
      throw new Error("Unauthorized");
    }


  } catch (error) {
    next(error);
  }
}

export async function revokefreshToken(req : Request, res : Response , next : NextFunction) {

  try {
    const { userId } = req.body
    await revokeTokens(userId);
    res.json({
      message : `Token revoked for user with id ${userId}`
    });

  } catch(error)  {
    next(error);
  }
}

interface RefreshTokenInput {
  refreshToken: string;
  userId: string;
}

function addRefreshTokenToWhitelist ({ refreshToken, userId} : RefreshTokenInput) {
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

function deletefreshTokenById(id : string) {
  return prisma.refreshToken.update({
    where : {
      id

    },
    data : {
      revoked : true
    },

  });

}

function revokeTokens(userId : string) {

  return prisma.refreshToken.updateMany({
    where : {
      userId,
    },
    data : {
      revoked : true
    },

  });
}

