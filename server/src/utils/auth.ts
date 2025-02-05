import jwt, { TokenExpiredError } from   "jsonwebtoken";
import { Response } from "express";

export function generateToken(res : Response, userId : number) {
  const jwtSecret = process.env.SECRET_TOKEN || "";
  const token = jwt.sign({ userId} ,jwtSecret, {
    expiresIn : "1h",
    }
  )

  res.cookie("jwt", token , {
    httpOnly :  true,
    sameSite : "strict",
    maxAge : 60 * 60 * 1000,
  });


}
export function clearToken(res : Response) {

  res.cookie("jwt", "", {
    httpOnly : true,
    expires : new Date(0)
  });

}