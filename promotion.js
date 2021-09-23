// Promotion class to store the various active promotions
class Promotion {
    constructor(skus, price){
        if (!skus || !price) {
            throw Error("Missing SKUs or price");
        }
        if (typeof price !== "number") {
            throw Error("Price not a number");
        }
        this.skus = skus;
        this.price = price;
        this.isSingleSku = [...new Set(skus)].length === 1 ? true : false;
    }
}

module.exports = Promotion