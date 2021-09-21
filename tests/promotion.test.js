const Promotion = require("../promotion")

describe("Promotion tests", () => {
    test("Multi SKU promotion", () => {
        const input = new Promotion(["A","B"],70)
        expect(input.skus).toEqual(["A","B"]);
        expect(input.price).toEqual(70);
        expect(input.isSingleSku).toEqual(false);
    });

    test("Single SKU Promotion", () => {
        const input = new Promotion(["A","A"],60)
        expect(input.skus).toEqual(["A","A"]);
        expect(input.price).toEqual(60);
        expect(input.isSingleSku).toEqual(true);
    });
});