let query = require("./query");



//BIDDING
addBid = async (req, res) => {
    try {
        let data = await query.getAllProductsQuery(req.params.bidId);
        let currentPrice = data[0].Current_Price;
        let bids = data[0].bids + 1;
        if (req.body.bid_price > currentPrice + 2) {
            if (bids <= 2) {
                await query.updateProductPriceQuery(parseFloat(req.body.bid_price), bids, req.params.bidId);
                await query.addBidQuery(req.body, req.params.bidId);
                res.status(200).redirect("/products");
            } else {
                await query.finalUpdateOnProduct(parseFloat(req.body.bid_price), bids, parseFloat(req.body.bid_price), true, req.params.bidId);
                await query.insertIntoCartQuery(req.body.UserId, req.params.bidId)
                res.status(201).send("Item Sold");
            }
        } else {
            res.status(412).send("The price must be at least 2$ higher than the current price");
        }
    } catch (error) {
        res.status(500).send(error.message)
    };
};


getBid = async (req, res) => {
    try {
        let data = await query.getAllProductsQuery(req.params.productId);
        res.status(200).send(data[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { addBid, getBid }