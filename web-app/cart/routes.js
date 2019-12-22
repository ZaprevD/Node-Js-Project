let express = require("express");
let router = express.Router();
let action = require("./action");

router.get("/cart/:userId", action.getAllProductsForSpecificCart)
//router.post("/cart", action.insertIntoCart); //UNUSED

module.exports = router;