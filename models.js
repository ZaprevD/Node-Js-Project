class Product{
    constructor(id, desc, lastPrice, categoryId, categoryName){
        this.id = id;
        this.desc  = desc;
        this.lastPrice = lastPrice;
        this.categoryId  = categoryId;
        this.categoryName = categoryName;
    }
}


module.exports = {Product}