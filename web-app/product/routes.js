let express = require("express");
let router = express.Router();
let action = require("./action");
const helper = require("../helper");


router.get("/products/all" , action.allProducts);   
router.post("/new" , helper.productValidator, action.addNewProduct);
router.delete("/products/:productId" , action.deleteProduct); //UNUSED

module.exports = router;