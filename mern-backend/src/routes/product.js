const express= require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
// const { addCategory, getCategories } = require('../controller/category');
const multer= require('multer');
const shortid = require('shortid')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+ '-' + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })

const router= express.Router();



router.post('/product/create',requireSignin, adminMiddleware,upload.array('productPictures'), createProduct)
router.get('/product/getproduct',(req,res) => {
    Product.find({})
    .exec((err,products) => {
        if(err) {
            return res.status(400).json({err});
        }
        else{
            return res.status(200).json({products})
        }
    })
})

module.exports=router;