// Item class to store different skus and their unit prices
class Item {
    constructor(sku, price) {
        if (!sku || !price) {
            throw Error("Missing SKU or price");
        }
        if (typeof sku !== "string") {
            throw Error("Sku not a string");
        }
        if (typeof price !== "number") {
            throw Error("Price not a number");
        }
        this.sku = sku;
        this.price = price;
    }
}

module.exports = Item