import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";


const produCtrouter = express.Router();

produCtrouter.post("/",addProduct);
produCtrouter.get("/",getProducts);

export default produCtrouter;

