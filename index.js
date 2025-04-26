import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";


const app=express();

app.use(bodyParser.json());//midleware
app.use((req,res,next)=>{//authorization part user kenek log weddi user kawda kiyala idintify kara gannawa
    const tokenString = req.header("Authorization")
    if(tokenString !=null){
        const token = tokenString.replace("Bearer ","")
       

        jwt.verify(token,"cbc-batch-five#@2025",
            (err,decoded)=>{
                if(decoded !=null){
                    console.log(decoded)
                    req.user=decoded
                    next()
                }else{
                    console.log("invalid token")
                    res.status(403).json({
                        message:"invalid token"
                    })
                }
              
            }
        ) 
    }else{
        next()
    }
 
       // next()
})

mongoose.connect("mongodb+srv://Admin:123@cluster0.vycnufo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to the database")
}).catch(()=>{
    console.log("database connection failed")
})



app.use("/Products",productRouter)
app.use("/users",userRouter)


app.listen(5000,
    ()=>{
        console.log('Server is running on port 5000')
    }

    
)