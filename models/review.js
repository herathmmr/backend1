import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type: String,
        required :true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    Comment :{
        type: String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    isApproved: {
        type : Boolean,
        required : true,
        default : false
    },
    profilePicture:{
        type : String,
        required : true,
        default : "https://images.app.goo.gl/kP5SNwBts5ZFh5UJA"
    }
     
});

const Review = mongoose.model("Review",reviewSchema);

export default Review;