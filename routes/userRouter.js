import express from "express";
import { createUser, getUser, loginUser, loginWithGoogle, resetPassword, sendOTP } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",createUser)//localhost:5000/users
userRouter.post("/login", loginUser)//localhost:5000/users/login
userRouter.get("/login", loginUser)
userRouter.post("/login/google", loginWithGoogle)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password", resetPassword)
userRouter.get("/", getUser)


export default userRouter;






