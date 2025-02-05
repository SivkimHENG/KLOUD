import { authenticateUser, logoutUser, registerUser } from "../controllers/auth-controller";
import express from "express";


 const router = express.Router();


router.get("/register", registerUser);
router.get("/login", authenticateUser);
router.get("/logout", logoutUser);


export default router;