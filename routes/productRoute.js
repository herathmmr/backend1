import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";


const produCtrouter = express.Router();

produCtrouter.post("/",addProduct);
produCtrouter.get("/",getProducts);
produCtrouter.put("/:key",updateProduct)
produCtrouter.delete("/:key",deleteProduct);


export default produCtrouter;

