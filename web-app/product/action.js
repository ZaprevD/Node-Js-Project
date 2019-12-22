let query = require("./query");


allProducts = async (req, res) => {
    try {
        let data = await query.getAllProductsQuery();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

addNewProduct = async (req, res) => {
    try {
        let data = await query.isAdminOrSupplierQuery(req.body.yourUserName);
        let dbUser = data[0];
        if (dbUser.Is_supplier) {
            await query.addNewProductQuery(req.body);
            res.status(200).redirect("/products");
        } else {
            res.status(403).send("You don't have permision to add new product");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

deleteProduct = async (req, res) => {
    try {
        await query.deleteProductQuery(req.params.id);
        res.status(200).send("product deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {addNewProduct, deleteProduct, allProducts };