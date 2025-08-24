import express from "express";
import addInquiry from "../controllers/inquiryController.js";

const inquiryRoute = express.Router();

inquiryRoute.post("/",addInquiry);

export default inquiryRoute;