const jwt=require('jsonwebtoken');
const foodpartnermodel=require('../models/foodpartner.model');
const usermodel=require('../models/user.model');

async function authfoodpartnermiddleware(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const foodpartner=await foodpartnermodel.findById(decoded.id);
        if(!foodpartner){
            return res.status(401).json({
                message:"Unauthorized"
            });
        }
        req.foodpartner=foodpartner;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }}

    async function authusermiddleware(req,res,next){
       const token=req.cookies.token;
       if(!token){
           return res.status(401).json({
                  message:"Unauthorized"
             });
        }
        
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const foods=await foodmodel.findOne(decoded.id);
            return res.status(200).json({
                message:"Foods fetched successfully",
                 foods: foods
            });
    }
module.exports= {
    authfoodpartnermiddleware,
    authusermiddleware
};