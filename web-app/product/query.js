let con = require("../database");

getAllProductsQuery = () => {
    let query = "SELECT * FROM product";
    return new Promise((resolve, reject) => {
        con.query(query,  (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

isAdminOrSupplierQuery = (username) => {
    let query = "SELECT Is_admin , Is_supplier FROM user WHERE Username = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [username], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
}



addNewProductQuery = (body) => {
    let query = "INSERT INTO product (Description, Current_Price, CategoryId) VALUES (?, ?, ?)";
    let product = [body.Description, body.Current_Price, body.CategoryId];
    return new Promise((resolve, reject) => {
        con.query(query, product, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

deleteProductQuery = (productId) => {
    let query = "DELETE FROM product WHERE Id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [productId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};


module.exports = {getAllProductsQuery, addNewProductQuery, deleteProductQuery, isAdminOrSupplierQuery}