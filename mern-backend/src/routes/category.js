const express= require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategories } = require('../controller/category');
const router= express.Router();

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
  });
   
var upload = multer({ storage: storage })

router.post('/category/create',requireSignin,upload.single('categoryImage'), adminMiddleware, addCategory)
router.get('/category/getcategory',getCategories)

module.exports=router;