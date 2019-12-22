
let con = require("../database");

getAllProductsQuery = (productId) => {
    let query = "SELECT Current_Price, bids FROM product WHERE Id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [productId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

updateProductPriceQuery = (price, bids, productId) => {
    let query = "UPDATE product SET Current_Price = ? , bids = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [price, bids, productId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

finalUpdateOnProduct = (price, bids, lastPrice, isSold, productId) => {
    let query = "UPDATE product SET Current_Price = ? , bids = ?, Last_Price = ?, Is_sold = ? WHERE Id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [price, bids, lastPrice, isSold, productId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

addBidQuery = (body, productId) => {
    let query = "INSERT INTO bid (UserId, ProductId) VALUES (?, ?)";
    let bidProduct = [body.UserId, productId];
    return new Promise((resolve, reject) => {
        con.query(query, bidProduct, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

insertIntoCartQuery = (userid , productid) => {
    let query = "INSERT INTO cart (UserId , ProductId) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
        con.query(query, [userid, productid], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

module.exports = { addBidQuery, getAllProductsQuery, updateProductPriceQuery, finalUpdateOnProduct, insertIntoCartQuery}