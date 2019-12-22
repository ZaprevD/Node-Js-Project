let conn = require("../database");
let {Product} = require("../../models");

insertIntoCartQuery = (body) => {
    let query = "INSERT INTO cart (UserId, ProductId) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [body.userId, body.productId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

insertIntoCart = async (req, res) => {
    try {
        await insertIntoCart(req.body);
        res.status(200).send("Product is added in the cart")
    } catch (error) {
        res.status(500).send(error.message);
    };
};

getAllProductsForSpecificCartQuery = (userId) => {
    let query = "SELECT * FROM cart JOIN product ON cart.ProductId = product.Id JOIN category ON product.CategoryId = category.Id WHERE cart.UserId = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};


getAllProductsForSpecificCart = async (req, res) => {
    try {
        let data = await getAllProductsForSpecificCartQuery(req.params.userId);
        let resolvedData = data.map(element => {
            return new Product(element.Id, element.Description, element.Last_Price, element.Is_sold, element.Name);
        })
        res.status(200).send(resolvedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { insertIntoCart, getAllProductsForSpecificCart };