let con = require("../database");

getAllCategoriesQuery = () => {
    let query = "SELECT * FROM category";
    return new Promise((resolve, reject) => {
        con.query(query , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};

getAllCategories = async(req, res) => {
    try {
            let data = await getAllCategoriesQuery();
            res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {getAllCategories};