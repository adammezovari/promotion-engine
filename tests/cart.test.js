const Cart = require("../cart")
const Item = require("../item")
const Promotion = require("../promotion")

let A = new Item("A",50);
let B = new Item("B",30);
let promotionAs = new Promotion(["A","A","A"],130)
let promotionAB = new Promotion(["A","B"],70)

describe("Cart tests", () => {
    test("Add item to cart", () => {
        const input = new Cart()
        input.addItem(A)
        input.addItem(B)
        expect(input.total).toEqual(80);
        expect(input.items).toEqual({
            A: {amount: 1, usedForPromotion: 0, unitPrice: 50},
            B: {amount: 1, usedForPromotion: 0, unitPrice: 30},
        });
    });

    test("Get available items for Multi SKU Promotion", () => {
        const input = new Cart()
        input.addItem(A)
        input.addItem(B)
        expect(input.getAvailableItemsForPromotion()).toEqual(["A","B"]);
    });

    test("Apply promotions I", () => {
        const input = new Cart([promotionAs,promotionAB])
        input.addItem(A)
        input.addItem(A)
        input.addItem(A)
        input.addItem(B)
        input.checkout();
        expect(input.total).toEqual(160);
        expect(input.items).toEqual({
            A: {amount: 3, usedForPromotion: 3, unitPrice: 50},
            B: {amount: 1, usedForPromotion: 0, unitPrice: 30},
        });
    });

    test("Apply promotions II", () => {
        const input = new Cart([promotionAs,promotionAB])
        input.addItem(A)
        input.addItem(A)
        input.addItem(A)
        input.addItem(A)
        input.addItem(B)
        input.checkout();
        expect(input.total).toEqual(200);
        expect(input.items).toEqual({
            A: {amount: 4, usedForPromotion: 4, unitPrice: 50},
            B: {amount: 1, usedForPromotion: 1, unitPrice: 30},
        });
    });
});