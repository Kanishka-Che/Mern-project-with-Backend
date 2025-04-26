import Product from "../models/product.js"
import {isAdmin} from "./userController.js";

export async function getProducts(req,res){
       

        try{
            const Products=await Product.find();
            res.json(Products)
        }catch(err){
            res.json({
                message:"Failed to get products",
                error:err
            })
        }

}
export function saveProducts(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message:"You are not authorized to add a product"
        })
        return;
    }

    const product =new Product(
        req.body
    );

    product
        .save()
        .then(()=>{
            res.json({
                message:"product added successfully"
            });
        })
        .catch(()=>{
            res.json({
                message:"Failed to add product"
            });
        });


}

