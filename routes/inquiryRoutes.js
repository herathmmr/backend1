import express from "express";
import {addInquiry,getInquiry,deleteInquiry, updateInquiry} from "../controllers/inquiryController.js";

const inquiryRoute = express.Router();

inquiryRoute.post("/",addInquiry);
inquiryRoute.get("/",getInquiry);
inquiryRoute.delete("/:id",deleteInquiry);
inquiryRoute.put("/:id",updateInquiry);
export default inquiryRoute;