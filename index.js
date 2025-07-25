import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import orderRouter from './routes/orderRouter.js';
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
const app=express();

app.use(cors(
    {
        
    }
))
app.use(bodyParser.json());//midleware
app.use((req,res,next)=>{//authorization part user kenek log weddi user kawda kiyala idintify kara gannawa
    const tokenString = req.header("Authorization")
    if(tokenString !=null){
        const token = tokenString.replace("Bearer ","")

        jwt.verify(token,process.env.JWT_KEY , (err, decoded) => {
            if (err) {
                console.log("Invalid token");
                return res.status(403).json({ message: "Invalid token" });
            }    
            req.user = decoded;
            next();
        });       
    }else{
        next();
    }
});
//connect with mongoDB
    mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
                console.log("Connected to the database")
        }).catch((err) => {
                console.log("Database connection failed:", err.message);
})


app.use("/api/products", productRouter),
app.use("/api/users",userRouter),
app.use("/api/orders",orderRouter)
app.listen(5000,
    ()=>{
        console.log('Server is running on port 5000')
    }
)