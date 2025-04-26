import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        email:{
                type:String,
                required:true,
                unique:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,        
        },
        password:{
            type:String,
            required:true,
        },
        role:{//customer or user
            type:String,
            required:true,
           default:"customer"//if not gave the role it save the customer
        },
        isBlocked:{
            type:String,
            required:true,
            default:false //user create account in that time not a blocked therefor default is false 
        },
        img:{
            type:String,
            required:true,
            default:"https://avatar.iran.liara.run/public/boy?username=Ash"
        },



});

const User = mongoose.model("users",userSchema);
export default User;