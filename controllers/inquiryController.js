import e, { response } from "express";
import Inquiry  from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export  async function  addInquiry(req,res){
    try{
        if(isItCustomer(req)){
            const data = req.body;
            data.email = req.user.email;
            data.phone = req.user.phone;

            let id =0
            const inquiries = await Inquiry.find().sort({_id : -1}).limit(1);
            if(inquiries.length == 0){
                id =1;
            }else{
                id = inquiries[0].id +1;
            }
            data.id = id; 
            const  newInquiry = new Inquiry(data);
            const response = await newInquiry
            .save();
            res.json({message : "inquiry added successfully",
                id : response.id
            });
            
        }else{
            res.status(401).json({message :"inquery add unsuccessfull"})        }

    }catch(error){
        //console.log(error)
        res.status(500).json({message : "inquiry add failed",error : error.message});
    }
}
export  async function getInquiry(req,res){

    try{
       
        if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
            }else if(isItCustomer(req)){
                const inquiries = await Inquiry.find({email : req.user.email});
                res.json(inquiries);
            }else{
                res.json({message :" your not authorize to perform this"})
            }
    }catch(error){
        res.Status(500).json({message : "inquiry getting faild"})
    }
}
export async function deleteInquiry(req,res){
    try{
        const id= req.params.id;
        if(isItAdmin(req)){
            
            await Inquiry.deleteOne({id:id})
                res.json({message : "delete successfully"})
            return
            
        }else if(isItCustomer(req)){
            const inquery = await Inquiry.findOne({id:id})
            if(inquery == null){
                res.json({message :" inquiry not found"})
              
            }else{
                if(inquery.email == req.user.email){
                    await Inquiry.deleteOne({id:id});
                    res.json({message : "cus delete successfully"})
                }

            }
        }else{
            res.json({message : " your not authorize to perform this"})
        }
        
       

    }catch(error){
        res.status(500).json({message :"inquiry delete fail"})

    }
}
export async function updateInquiry(req,res){
    try{
        const id = req.params.id;
        const data = req.body;
        if(isItAdmin(req)){
            await Inquiry.updateOne({id:id}, data);
            res.json({message : "inquiry update successfully"});
            return;
        }else if(isItCustomer(req)){
            const inquiry = await Inquiry.findOne({id:id});
            if(inquiry == null){
                res.json({message :" inquiry not found"});
                return;
            }
            if(inquiry.email == req.user.email){
                await Inquiry.updateOne({id:id}, {massage : data.massage});
                res.json({message : "cus update successfully"});
                return;
            }else{
                res.status(403).json({
                    message : "you are not authorize to access this action"
                });
                return;
            }
        }else{
            res.status(403).json({
                message : "you are not authorize to access this action"
            });
            return;
        }
    }catch(error){
        res.status(500).json({message :"inquiry update fail"});
    }
}