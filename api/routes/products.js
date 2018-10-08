const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer  = require('multer');
const checkAuth = require("../middleware/check-auth");
const ProductsController  = require('../controller/products');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/image');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage});
const router = express.Router();


router.get("/", ProductsController.products_get_all);

router.post("/", checkAuth, upload.single('productImage'), ProductsController.products_create);

router.get("/:productId", ProductsController.products_get_single);

router.patch("/:productId", checkAuth, ProductsController.product_modify);

router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;

