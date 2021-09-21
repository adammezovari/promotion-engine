// Promotion class to store the various active promotions
class Promotion {
    constructor(skus, price){
        this.skus = skus;
        this.price = price;
        this.isSingleSku = [...new Set(skus)].length === 1 ? true : false;
    }
}

module.exports = Promotion