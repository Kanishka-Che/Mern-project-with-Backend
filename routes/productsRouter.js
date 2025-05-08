import express from "express";
import { deleteProduct, getProductById, getProducts, saveProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", saveProduct);//insert(create)
productRouter.get("/", getProducts);//product get(retrive)
productRouter.put("/:productId", updateProduct)//update
productRouter.delete("/:productId", deleteProduct)//delete


export default productRouter;