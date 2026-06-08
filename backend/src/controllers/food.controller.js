const foodmodel=require('../models/food.model');
const { uploadImage } = require('../service/storage.service');
const { v4: uuid } = require('uuid');



async function createfood(req,res){

    console.log(req.foodpartner);
    console.log(req.body);
    console.log(req.file);

    const fileuploadresult= await uploadImage(req.file.buffer, uuid());

    const fooditem=await foodmodel.create({
        name:req.body.name,
        description:req.body.description,
        videoUrl:fileuploadresult.url,
        foodPartner:req.foodpartner._id
    });

    return res.status(201).json({
        message:"Food item created successfully",
         food: fooditem
    });
}
async function getfoods(req,res){
    const foods=await foodmodel.find();
    return res.status(200).json({
        message:"Foods fetched successfully",
         foods: foods
    });

}

module.exports={
    createfood,
    getfoods
}