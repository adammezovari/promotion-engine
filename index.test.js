const Item = require("./index");
const sortCart = require("./index");

// Initialize products
let A = new Item("A",50);
let B = new Item("B",30);
let C = new Item("C",20);
let D = new Item("D",15);

let testCart = [B,A,A,C,A,D]
console.log(testCart)

test("Sorts cart by SKU", () => {
    console.log("Cart", testCart)
    expect(sortCart(testCart)).toBe("A,A,A,B,C,D");
});