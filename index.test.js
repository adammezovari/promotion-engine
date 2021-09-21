const sortCart = require("./index");

describe("Sorts cart by SKU", () => {
    test("it should alphabetically sort the cart items by their SKUs", () => {
        const input = ["B","A","D","C"]
        expect(sortCart(input)).toEqual(["A","B","C","D"]);
    });
});