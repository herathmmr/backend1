import express from "express"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"
import userRouter from "./routes/userRouter.js";
import produCtrouter from "./routes/productRoute.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();
let app= express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token =req.header("Authorization")
    console.log(token)
    if(token != null){
        token=token.replace("Bearer ", "");
        //methanadi thmai jwt import krgnn ona wenne
        jwt.verify(token,process.env.SECRET_KEY,
            (err,decoded)=>{
              
           if(!err){
            //console.log(decoded); ohom dala thma terminal eken blagnn pluwn wenne Bearer nthuw pennane kohomda kiyla.ek enne na hbei.mekt pse ek thm mekt pahla tiyenne
            req.user=decoded; // req.user kiyna eka ona thanakat gnn pluwn.productController eke thiyenw aragen.
           } 
        });
        
    }
    next()
})




let mongoUrl =process.env.MONGO_URL;//"kalin methana thmayi mongodb url eka dala thibbe" //mongoUrl kiynne variable ekak declare kre

mongoose.connect(mongoUrl)

let connection =mongoose.connection // meken thama connection eka hduwe
connection.once("open",()=>{
    console.log("MongoDB connection successfull")
})

app.use("/api/users",userRouter);
app.use("/api/products",produCtrouter);
app.use("/api/reviews",reviewRouter);





app.listen(3003,()=>{
    console.log("server is running on 3003")
})