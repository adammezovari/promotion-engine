const Item = require("./item")
const Promotion = require("./promotion")
const Cart = require("./cart")

// Initialize active promotions
let promotionAs = new Promotion(["A","A","A"],130)
let promotionBs = new Promotion(["B","B"],45)
let promotionCD = new Promotion(["C","D"],30)

// Define shopping cart with active promotions
let cart = new Cart([promotionAs,promotionBs,promotionCD])

// Initialize Items
let A = new Item("A",50);
let B = new Item("B",30);
let C = new Item("C",20);
let D = new Item("D",15);

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

cart.checkout()

console.log("\nYour cart after applying promotions:")
cart.printCart()