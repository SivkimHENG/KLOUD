import express,  { Request, Response,NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { isAuthentication } from "../middlewares/middlewares";
import { findUserById } from "../controllers/user-controller";


interface AuthenticationRequest extends Request {
  payload? : JwtPayload;

}

export const router = express.Router();

router.post("/dashboard",isAuthentication, async (req : AuthenticationRequest, res : Response, next : NextFunction) => {
  try {
    if (!req.payload) {
      throw new Error("Unauthorization");
    }
    const { userId } = req.payload;
    const user = await findUserById(userId);
    if(user) {
      user.password = undefined;
    }
    res.json(user);

  } catch (error) {
    next(error);

    }

}); 
