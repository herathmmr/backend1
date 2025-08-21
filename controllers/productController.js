import Product from "../models/products.js";
import { isItAdmin } from "./userController.js"; // Importing the isItAdmin function

export async function addProduct(req, res) {

    console.log(req.user)
   
    if(req.user == null){
        res.status(401).json({
            message:"please login and try again"
            
        })
        return
    }
    if(req.user.role != "admin"){
        res.status(401).json({
            message:"your not authorize user.so you cant add product"
        })
        return
    }
    const data = req.body;
    const newProduct = new Product(data);

   /* newProduct.save()
        .then(() => {
            res.json({ message: "Product added successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Product add failed", error: error.message });
        }); try catch wlin hdala thiyenne pahala me fuction ekama*/
      try{
            await newProduct.save()
            res.json({message : "product added successfully"})
      }catch(error){
         res.status(500).json({ message: "Product add failed", error: error.message });

      }
}
export async function getProducts(req,res){
    /*let isAdmin = false;
    if(req.user != null && req.user.role == "admin"){
        isAdmin = true;
    }
    */// meka thama isItAdmin function eka.pahala hdala thiyenne e function eka.
    

    try{
        if(isItAdmin(req)){
            const products = await Product.find();
            res.json(products);
            return;
        }else{
            const products = await Product.find({availability : true});
            res.json(products);
            return;
        }

       /*const products = await Product.find();
        res.json(products); okkotama blanna pluwan widiya   */

    }catch(e){
        res.status(500).json({message : "faild to get products"})
    }
}

/*function isItAdmin(req){
    
    let isAdmin = false;
    if(req.user != null && req.user.role == "admin"){
        return isAdmin = true;
    }
    return isAdmin;
}
    code eke validation eka thiygnn ona nisa meka userController ekt dnw */