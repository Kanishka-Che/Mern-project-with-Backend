import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function createUser(req,res){
        if(req.body.role =="admin"){
            if(req.user!=null){
                if(req.user.role !="admin"){
                    res.status(403).json({
                        message:"You are not authorizer to create an admin accounts"
                    })
                    return
                }
            }else{
                res.status(403).json({
                    message:"You are not authorized to create an admin accounts.Please login first"
                })
                return
            }
        }




        const hashedPassword=bcrypt.hashSync(req.body.password,10)//password hashing eka 10 parak karanna

        const user = new User({
            firstName : req.body.firstName ,
            lastName : req.body.lastName,
            email : req.body.email,
            password :hashedPassword,
            role:req.body.role,
        })

            user.save().then(()=>{
                res.json({
                    message:"User created successfully"
                })
            }).catch((err)=>{
                console.error("Save product error:", err); 
                res.status(400).json({
                    message:"Failed to add product",
                    error: err.message 
                });
            });
            
}
export function loginUser(req,res){
    const email = req.body.email
    const password= req.body.password

    User.findOne({email:email})//adala email eka userge req eken awa email ekama hoyala denna
    .then(
        (user)=>{
           if(user==null){
            res.status(404).json({
                message:"User not found"
            })
           }else{
            const isPasswordCorrect=bcrypt.compareSync(password,user.password)/*password correct or not*/
                if(isPasswordCorrect){
                        //generate token and send it to the user
                    const token = jwt.sign(
                       {
                        email : user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        role:user.role,
                        img:user.img
                       },
                       "cbc-batch-five#@2025"//use jwt
                    )
                    res.json({
                        message:"Login successful",
                        token:token 
                    })
                }else{
                    res.status(401).json({
                        message:"Invalid password"
                    })
                }

           }
        }
    )
} 

export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.role !="admin"){
        return false
    }
    return true
}