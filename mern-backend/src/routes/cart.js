const express= require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addItemTocart } = require('../controller/cart');
const router= express.Router();

router.post('/user/cart/addtocart',requireSignin, userMiddleware, addItemTocart)


module.exports=router;