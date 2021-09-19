// Item class to store different skus and their unit prices
class Item {
    constructor(sku, price) {
        this.sku = sku;
        this.price = price;
    }
}

// Initialize products
let A = new Item("A",50);
let B = new Item("B",30);
let C = new Item("C",20);
let D = new Item("D",15);


// Promotion class to store the various active promotions
class Promotion {
    constructor(skus, price){
        this.skus = skus;
        this.price = price;
        this.isSingleSku = [...new Set(skus)].length === 1 ? true : false;
    }
}

// Initialize active promotions
let promotion1 = new Promotion(["A","A","A"],130)
let promotion2 = new Promotion(["B","B"],45)
let promotion3 = new Promotion(["C","D"],30)


let promotions = [promotion1,promotion2,promotion3]


// Define shopping cart
let cart = [B,A,A,C,A,D,D,A,B,B,A,D]
let total = applyPromotions(cart,promotions)

// Apply discounts on cart
function applyPromotions(cart,promotions){

    let totalPrice = 0;

    cart = sortCart(cart)
    let grouppedCart = groupCart(cart)

    // get promotions for single / multi skus
    let singleSkuPromotions = promotions.filter(x=>x.isSingleSku)
    let multiSkuPromotions = promotions.filter(x=>!x.isSingleSku)

    // 1. Single SKU discount checker
    Object.keys(grouppedCart).forEach(key => {

        // find related promotions if any
        let promotionForSku = singleSkuPromotions.find(x=> x.skus[0] === key)

        // if no promotions found, check next sku
        if (!promotionForSku) return;

        // check if amount in cart is enough for promotion
        if (grouppedCart[key].length >= promotionForSku.skus.length) {
            
            // total amount of specific item
            let totalAmount = grouppedCart[key].length

            // amount of items used for discount
            let discountCounter = parseInt(totalAmount / promotionForSku.skus.length)

            // add discount price to total price
            totalPrice += discountCounter*promotionForSku.price

            // remove discounted cart elements
            cart.splice(cart.findIndex(x=>x.sku === key), discountCounter*promotionForSku.skus.length);
        }
    })

    console.log(cart)

    console.log("TOTAL: ", totalPrice)
}

function groupCart(cart){
    if(!Array.isArray(cart)) return cart;
    return cart.reduce(function(rv, x) {
        (rv[x["sku"]] = rv[x["sku"]] || []).push(x);
        return rv;
    }, {});
}

function sortCart(cart) {
    if(!Array.isArray(cart)) return cart;
    return cart.sort((a,b) => a.sku > b.sku ? 1 : -1)
}

function mapCart(cart){
    if(!Array.isArray(cart)) return cart;
    return cart.map(x=>x.sku)
}

module.exports = Item;
module.exports = Promotion;
module.exports = groupCart;
module.exports = sortCart;
module.exports = mapCart;
module.exports = applyPromotions;