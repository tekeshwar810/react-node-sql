const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");
const upload = require("../middlewares/imageUpload");
const validate = require("../middlewares/validate");
const { authenticate } = require("../middlewares/authentication");
const { addProductValidation, updateProductValidation } = require("../validations/products.validation")

router.route('/')
    .post(authenticate, upload.multiImageUpload("images"), validate(addProductValidation), productController.addProduct)
    .get(authenticate, productController.getAllProduct);

router.route('/:id')    
        .get(authenticate, productController.getProduct)
    
router.route('/:id')    
    .patch(authenticate, upload.multiImageUpload("images"), validate(updateProductValidation), productController.updateProduct)

router.route('/:id')    
    .delete(authenticate, productController.deleteProduct)    

module.exports = router;