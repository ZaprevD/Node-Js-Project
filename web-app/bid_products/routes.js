let express =require("express");
let router = express.Router();
let action  = require("./action");

router.get("/bids/:productId", action.getBid);
router.post("/bids/:bidId", action.addBid);

module.exports = router;