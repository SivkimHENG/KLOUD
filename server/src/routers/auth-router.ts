import { 
    authenticateUser,
    logoutUser,
    registerUser ,
refreshTokenUser
} from "../controllers/auth-controller";
import express from "express";


 const router = express.Router();


router.get("/register", registerUser);
router.get("/login", authenticateUser);
router.get("/logout", logoutUser);


router.post("/refreshtoken", refreshTokenUser );


export default router;
