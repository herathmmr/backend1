import Inquiry  from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export async function  addInquiry(req,res){
    try{
        if(isItCustomer(req)){
            const data = req.body;
            
        }

    }catch(error){
        res.status(500).json({message : "inquiry add failed",error : error.message});
    }
}
