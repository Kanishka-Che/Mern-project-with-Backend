import express from "express";
import { deleteProduct, getProductById, getProducts, saveProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.get("/", getProducts);//product get(retrive)
productRouter.post("/", saveProduct);//insert(create)
productRouter.delete("/:productId", deleteProduct)//delete
productRouter.put("/:productId", updateProduct)//update
productRouter.get("/:productId",getProductById)


export default productRouter;