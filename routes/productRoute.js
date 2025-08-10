import express from "express";
import { addProduct } from "../controllers/productController.js";


const produCtrouter = express.Router();

produCtrouter.post("/",addProduct);

export default produCtrouter;

