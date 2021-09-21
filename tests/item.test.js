const Item = require("../item")

describe("Item test", () => {
    test("This should output the SKU and the price for an Item", () => {
        const input = new Item("A",50)
        expect(input.sku).toEqual("A");
        expect(input.price).toEqual(50);
    });
});