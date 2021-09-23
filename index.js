const Item = require("./item")
const Promotion = require("./promotion")
const Cart = require("./cart")

// Initialize Items
let A = new Item("A",50);
let B = new Item("B",30);
let C = new Item("C",20);
let D = new Item("D",15);

// Initialize active promotions
let promotionAs = new Promotion(["A","A","A"],130)
let promotionBs = new Promotion(["B","B"],45)
let promotionCD = new Promotion(["C","D"],30)
let promotions = [promotionAs,promotionBs,promotionCD]

// Define shopping cart
let cart = new Cart()
// add items to cart
cart.addItem(A)
cart.addItem(A)
cart.addItem(A)
cart.addItem(A)
cart.addItem(A)
cart.addItem(B)
cart.addItem(B)
cart.addItem(B)
cart.addItem(B)
cart.addItem(B)
cart.addItem(C)
cart.addItem(D)

// print initial cart
console.log("Your cart before applying promotions:")
cart.printCart()

let singleSkuPromotions = promotions.filter(x=>x.isSingleSku)
let multiSkuPromotions = promotions.filter(x=>!x.isSingleSku)

console.log("Applying single sku promotions...")
applySingleSkuPromotions(cart,singleSkuPromotions)

console.log("\nApplying multi sku promotions...")
applyMultiSkuPromotions(cart,multiSkuPromotions)

function applySingleSkuPromotions(cart, promotions){

    Object.keys(cart.items).forEach(key => {

        // find related promotions if any
        let promotion = promotions.find(x=> x.skus[0] === key)

        // if no promotions found, check next sku
        if (!promotion) return;

        // check if amount in cart is enough for promotion
        if (cart.items[key].amount >= promotion.skus.length) {
            console.log("DISCOUNT! %d of %s for %d", promotion.skus.length, promotion.skus[0], promotion.price)
            cart.applySingleSkuPromotion(promotion)
        }
    })
}

function applyMultiSkuPromotions(cart,promotions){
   
    promotions.forEach(promotion=> {
        
        // get list of available items for promotion
        let availableItems = cart.getAvailableItemsForPromotion()

        // check if all skus are in the cart for the promotion
        let foundAllSku = true

        // check each sku against cart and available amount for discount
        promotion.skus.forEach(sku =>{
            if(!availableItems.includes(sku)){
                foundAllSku=false
            }
        });

        // if all skus are in the cart with enough amount
        if (foundAllSku){
            console.log("DISCOUNT! %s for %d", promotion.skus.join("+"), promotion.price)
            cart.applyMultiSkuPromotion(promotion)
        }
    })
}
console.log("\nYour cart after applying promotions:")
cart.printCart()