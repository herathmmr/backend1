import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req, res) {
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password,10);

    const newUser = new UserModel(userData);

    newUser.save()
        .then(() => {
            res.status(201).json({
                message: "User added successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "User registration failed",
                error: error.message
            });
        });
}
export function loginUser(req,res){

    const userData=req.body;
    UserModel.findOne({
    
        email : userData.email

    }).then((user)=>{
        if(user==null){
            res.status(404).json({
                error:"uset not found"
            })
        }
        else{
            //res.json({message : "user found ",user:user});
            
            const isPasswordCorrect = bcrypt.compareSync(userData.password,user.password);
            if(isPasswordCorrect){

                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture:user.profilePicture,        // me thiyenne api encrypt krnn ona data tika meke thiyenne
                                      },process.env.SECRET_KEY) //methna malshan1234 kiynne website eka api dana password eka //me comment ekath ain wenna ona commit krddi
                res.json({message :" login successfull",token:token});
            }else{
                res.status(404).json({error:"login fail"})
            }
        }
    })
}