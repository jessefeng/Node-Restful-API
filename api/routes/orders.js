const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const OrdersController  = require('../controller/orders');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth,OrdersController.orders_create);

router.get("/:orderId", checkAuth, OrdersController.orders_get_single);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete);

module.exports = router;