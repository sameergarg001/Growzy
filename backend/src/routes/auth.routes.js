const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');

//user routes
router.post('/user/register', authController.registeruser);
router.post('/user/login', authController.loginuser);
router.get('/user/logout', authController.logoutuser);


//food partner routes
router.post('/foodpartner/register', authController.registeruser);
router.post('/foodpartner/login', authController.loginuser);
router.get('/foodpartner/logout', authController.logoutuser);


module.exports=router;