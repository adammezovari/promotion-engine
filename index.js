// Item class to store different skus and their unit prices
class Item {
    constructor(sku, price) {
        this.sku = sku;
        this.price = price;
    }
}

// Promotion class to store the various active promotions
class Promotion {
    constructor(skus, price){
        this.skus = skus;
        this.price = price;
        this.isSingleSku = [...new Set(skus)].length == 1 ? true : false;
    }
}


console.log("Hello world")