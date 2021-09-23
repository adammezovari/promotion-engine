// Cart class to store items and total price
class Cart {
    constructor(){
        this.items = {}
        this.total = 0
    }

    addItem(item){
        if (!item) {
            throw Error("Missing item");
        }
        if (Object.keys(this.items).includes(item.sku)) {
            this.items[item.sku].amount++
        } else {
            this.items[item.sku] = {
                amount: 1,
                usedForPromotion: 0,
                unitPrice: item.price
            }
        }
        this.total += item.price
    }

    getAvailableItemsForPromotion(){
        let availableItems = []
        for (const [key, value] of Object.entries(this.items)) {
            if (value.amount-value.usedForPromotion > 0){
                availableItems.push(key)
            }                
          }
          return availableItems
    }

    applySingleSkuPromotion(promotion){
        if (!promotion) {
            throw Error("Missing promotion");
        }
        let apply = parseInt((this.items[promotion.skus[0]].amount - this.items[promotion.skus[0]].usedForPromotion) / promotion.skus.length)
        
        for (let i = 0; i<apply;i++){
            this.items[promotion.skus[0]].usedForPromotion += promotion.skus.length
            this.total -= promotion.skus.length*this.items[promotion.skus[0]].unitPrice
            this.total += promotion.price
        }
        
    }

    applyMultiSkuPromotion(promotion){
        if (!promotion) {
            throw Error("Missing promotion");
        }
        promotion.skus.forEach(sku => {
            this.items[sku].usedForPromotion += 1
            this.total -= this.items[sku].unitPrice
        })

        this.total += promotion.price
    }

    printCart(){
        console.log("Items: ", this.items, "\nTotal: ",this.total+"\n")
    }
}

module.exports = Cart