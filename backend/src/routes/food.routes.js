const express=require('express');
const router=express.Router();
const authmiddleware=require('../midleware/auth.middleware');
const foodController=require('../controllers/food.controller');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/',authmiddleware.authfoodpartnermiddleware,upload.single('video'),foodController.createfood); 

router.get('/',authmiddleware.authusermiddleware,foodController.getfoods);

module.exports=router;
