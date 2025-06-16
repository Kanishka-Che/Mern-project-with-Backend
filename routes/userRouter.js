import express from "express";
import { createUser, loginUser, loginWithGoogle, resetPassword, sendOTP } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",createUser)//localhost:5000/users
userRouter.post("/login", loginUser)//localhost:5000/users/login
userRouter.post("/login/google", loginWithGoogle)



export default userRouter;






