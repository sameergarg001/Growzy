
const usermodel=require('../models/user.model');
async function register(req,res){
    const {username,email,password}=req.body;
    
    const isUserExist=await usermodel.findOne({email});
    if(isUserExist){
        return res.status(400).json({message:"User already exists"});
    }

    
}