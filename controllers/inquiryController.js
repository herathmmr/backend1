import Inquiry  from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export default async function  addInquiry(req,res){
    try{
        if(isItCustomer(req)){
            const data = req.body;
            const  newInquiry = new Inquiry(data);
            await newInquiry.save();
            res.json({message : "inquiry added successfully"});
            
        }else{
            res.status(401).json({message :"inquery add unsuccessfull"})        }

    }catch(error){
        res.status(500).json({message : "inquiry add failed",error : error.message});
    }
}
