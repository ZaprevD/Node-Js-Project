let express = require("express");
let router = express.Router();
let userRoutes = require("./user/routes");
let productRoutes = require("./product/routes");
let bidRoutes = require("./bid_products/routes");
let categoryRoutes = require("./category/routes");
let cartRoutes = require("./cart/routes");
let userInfoRoutes = require("./user/user-info/routes");

router.use(userRoutes);
router.use(productRoutes);
router.use(cartRoutes);
router.use(bidRoutes);
router.use(categoryRoutes);
router.use(userInfoRoutes);

module.exports = router;