const Promotion = require("../promotion")

describe("Promotion test", () => {
    test("This is testing a multi SKU promotion", () => {
        const input = new Promotion(["A","B"],70)
        expect(input.skus).toEqual(["A","B"]);
        expect(input.price).toEqual(70);
        expect(input.isSingleSku).toEqual(false);
    });

    test("This is testing a single SKU Promotion", () => {
        const input = new Promotion(["A","A"],60)
        expect(input.skus).toEqual(["A","A"]);
        expect(input.price).toEqual(60);
        expect(input.isSingleSku).toEqual(true);
    });
});