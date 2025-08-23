import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    
    key :{
        type: String,
        required : true,
        unique : true,
    },
    
    name:{
        type: String,
        required : true,
    },
    price :{
        type : String,
        required: true,
        default : 0.00,
    },
    category :{
        type : String,
        required : true,
        default :"uncategorized",
    },
    dimention:{
        type : String,
        required : true,
    },
    description:{
        type : String,
        required : true,
    },
    availability :{
        type : Boolean,
        required : true,
        default : true,
    },
    image :{
        type:[String],//multiple images add krana widiya.array ekkin eka krnne
        required : true,
        default : ["https://www.freeiconspng.com/uploads/no-image-icon-6.png"]
    }
});

const Product = mongoose.model("products",productSchema)

export default Product;