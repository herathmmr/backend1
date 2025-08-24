import mongoose from "mongoose";

const inquirySchema =  new mongoose.Schema({
   
   id :{
    type : Number,
    unique : true,
    required : true,
   },
   email : {
        type : String,
        required : true,
        unique : true,
    },
    massage :{
        type : String,
        required : true,

    },
    phoneNumber :{
        type : String,
        required : true,
    },
    date :{
        type : Date,
        required : true,
        default : Date.now,
    },
    response :{
        type : String,
        required : false,
        default : "",

    },
    isResolved :{
        type : Boolean,
        required : true,
        default : false,
    },
})
const Inquiry = mongoose.model("inquiries",inquirySchema)
export default Inquiry;