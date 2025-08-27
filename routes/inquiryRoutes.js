import express from "express";
import {addInquiry,getInquiry,deleteInquiry} from "../controllers/inquiryController.js";

const inquiryRoute = express.Router();

inquiryRoute.post("/",addInquiry);
inquiryRoute.get("/",getInquiry);
inquiryRoute.delete("/:id",deleteInquiry);

export default inquiryRoute;