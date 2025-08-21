import express from "express";
import { addProduct, getProducts, updateProduct } from "../controllers/productController.js";


const produCtrouter = express.Router();

produCtrouter.post("/",addProduct);
produCtrouter.get("/",getProducts);
produCtrouter.put("/:key",updateProduct)


export default produCtrouter;

