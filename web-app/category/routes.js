let express = require("express");
let router = express.Router();
let action = require("./action");

router.get("/categories" , action.getAllCategories);

module.exports = router;