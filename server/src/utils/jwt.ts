import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@prisma/client";


export function generateAccessToken(user : User) {

  return jwt.sign({ userId: user.id },
    process.env.JWT_SECRET as string, {
    expiresIn: '5m'
  })
}

export function generateRefreshTokens() {
  const token  = crypto.randomBytes(16).toString('base64');
  return token;
}

export function generateTokens(user : User) {

  const accessToken =  generateAccessToken(user);
  const refreshToken = generateRefreshTokens();

  return { accessToken, refreshToken }
}


