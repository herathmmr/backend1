import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.state(401).json({
            message : "please login and try again"
        })
        return
    }
    const data = req.body;

    data.name =req.user.firstName +" "+req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data)

    newReview.save().then(()=>{
        res.json({message : "Review added successfull"});
    }).catch((error)=>{
        res.status(500).json({error :"Review adition faild"})
    })
    
}
export function getReview(req,res){
    const user = req.user;
     
    if(user == null || user.role != "admin"){
        
        Review.find({isApproved : true}).then((reviews)=>{
            res.json(reviews);
        })
    }else{
        Review.find().then((reviews)=>{
            res.json(reviews);
        })
    }

}  


export function deleteReview(req,res){
    const email= req.params.email;

      if(req.user == null){
        res.state(401).json({
            message : "please login and try again"
        })
        return
    }


    if(req.user.role == "admin"){
      Review.deleteOne({email:email}).then(()=>{
        res.json({message : "review delete successfully"})
    }).catch((error)=>{
        res.status(500).json({
            message : "Review deletion failed"
        })
    })
    return
    }


    if(req.user.role == "customer"){
        if(req.user.email == email){
            
        Review.deleteOne({email:email}).then(()=>{
        res.json({message : "review delete successfully"})
    }).catch((error)=>{
        res.status(500).json({
            message : "Review deletion failed"
        })
    })
     }else{
            res.status(403).json({
                message : "you are not authorize to access this action"
            })
        }
    }
    }



export function approveReview(req,res){
    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({message: " please login and try again"});
        return
    }

    if(req.user.role == "admin"){
        Review.updateOne(
            {
                email : email
            },
            {
                isApproved :true
            }

        ).then(()=>{
            res.json({message:" review approved succesfully"})
        }).catch((error)=>{
            res.status(500).json({error :"review approval failed"})
        })
    }else{
        res.status(403).json({message : "you are not an admin.only admins can approved the reviews"})
    }
}
    
