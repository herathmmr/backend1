import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    price :{
        type : String,
        required: true,
        default : 0.00,
    },
    description:{
        type : String,
        required : true,
    },
});

const Product = mongoose.model("products",productSchema)

export default Product;