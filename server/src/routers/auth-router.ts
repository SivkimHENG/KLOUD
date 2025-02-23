import { 
    authenticateUser,
    registerUser ,
    profileUser,
refreshTokenUser
} from "../controllers/auth-controller";
import express from "express";
import { isAuthentication } from "../middlewares/middlewares";


const router = express.Router();


router.get("/register", registerUser);
router.get("/login", authenticateUser);


router.post("/refreshtoken", refreshTokenUser );
router.post("/profile", profileUser );


export default router;
