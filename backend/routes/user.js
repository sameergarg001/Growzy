const {Router}=require("express");

const userroute=Router();
const {User}=require("../db.js")


const jwt=require("jsonwebtoken");
const jwt_user_password="98150";
const bcrypt=require("bcrypt");
const z=require("zod")

userroute.post("/signup",async function(req,res){
 const requirepars=z.object({
        email:z.string().min(3).max(100),
        password:z.string().min(3).max(100),
        firstname:z.string().min(3).max(100),
        lastname:z.string().min(3).max(100),
        role:z.string().min(3).max(100)
    })
    const requestobject=requirepars.safeParse(req.body);
    if(!requestobject.success){
        return res.json({
            message:"Incorect format",
            error: requestobject.error
            
        })
    }
    
    const { email,password,firstname,lastname,role}=req.body;
    const hashpassword=await bcrypt.hash(password,5);
   await User.create({
        email,
        password:hashpassword,
        firstname,
        lastname,
        role
    })
    res.json({
        message:"signup done"
    })
    

})
userroute.post("/signin",async function(req,res){
   const {email,password}=req.body;
   const Response=User.findOne({
    email
   })
   const token=jwt.sign({
    id:Response._id

   },jwt_user_password)
   res.json({
    token
   })

})

module.exports = { userroute:userroute};