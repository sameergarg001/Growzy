const usermodel=require('../models/user.model');
const foodpartnermodel=require('../models/foodpartner.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

async function registeruser(req,res){
    const {username,email,password}=req.body;
    
    const isUserExist=await usermodel.findOne(
        {email}
    );

    if(isUserExist){

        return res.status(400).json({
            message:"User already exists"
        });
    }
         const hashPassword=await bcrypt.hash(password,10);

         const user=await usermodel.create({
            username,
            email,
            password:hashPassword
         });

         const token=jwt.sign(
            {id:user._id},process.env.JWT_SECRET
            );
        
            res.cookie("token",token);

         return res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                username:user.username
            }
         });
    
}
async function loginuser(req,res){
    const {email,password}=req.body;
    
    const user=await usermodel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        });
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid credentials"
        });
    }

    const token=jwt.sign(
        {id:user._id},process.env.JWT_SECRET
    );

    res.cookie("token",token);

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username
        }
    });
}
async function logoutuser(req,res){
    res.clearCookie("token");
    return res.status(200).json({
        message:"User logged out successfully"
    });
}

async function registerfoodpartner(req,res){
   const {name,email,password}=req.body;
    
    const isFoodPartnerExist=await foodpartnermodel.findOne(
        {email}
    );

    if(isFoodPartnerExist){
        return res.status(400).json({
            message:"Food Partner already exists"
        });
    }
            const hashPassword=await bcrypt.hash(password,10);
            const foodpartner=await foodpartnermodel.create({
                name,
                email,
                password:hashPassword
            });
            const token=jwt.sign(
                {id:foodpartner._id},process.env.JWT_SECRET
            );
            res.cookie("token",token);
            return res.status(201).json({
                message:"Food Partner registered successfully",
                foodpartner:{
                    id:foodpartner._id,
                    name:foodpartner.name
                }
            });

}
async function loginfoodpartner(req,res){
    const {email,password}=req.body;  
    const foodpartner=await foodpartnermodel.findOne({email});

    if(!foodpartner){
        return res.status(400).json({
            message:"Invalid credentials"
        });
    }
    
    const isMatch=await bcrypt.compare(password,foodpartner.password);

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid credentials"
        });
    }
    const token=jwt.sign(
        {id:foodpartner._id},process.env.JWT_SECRET
    );
    res.cookie("token",token);
    return res.status(200).json({
        message:"Food Partner logged in successfully",
        foodpartner:{
            id:foodpartner._id,
            name:foodpartner.name
        }
    });
}
async function logoutfoodpartner(req,res){
    res.clearCookie("token");
    return res.status(200).json({
        message:"Food Partner logged out successfully"
    });
}
module.exports={
    registeruser,
    loginuser,
    logoutuser,
    registerfoodpartner,
    loginfoodpartner,
    logoutfoodpartner
}           