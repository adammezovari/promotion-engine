// Cart class to store items and total price
class Cart {
    constructor(promotions){
        this.items = {}
        this.promotions = promotions
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

    checkout(){

        // mutually exclusive
        let promotionApplied = false
        
        let singleSkuPromotions = this.promotions.filter(x=>x.isSingleSku)
        let multiSkuPromotions = this.promotions.filter(x=>!x.isSingleSku)

        // single SKU promotions
        Object.keys(this.items).forEach(key => {

            // find related promotions if any
            let promotion = singleSkuPromotions.find(x=> x.skus[0] === key)
    
            // if no promotions found, check next sku
            if (!promotion) return;
    
            // check if amount in cart is enough for promotion
            if (this.items[key].amount >= promotion.skus.length) {
                console.log("DISCOUNT! %d of %s for %d", promotion.skus.length, promotion.skus[0], promotion.price)
                
                let applyCounter = parseInt((this.items[promotion.skus[0]].amount - this.items[promotion.skus[0]].usedForPromotion) / promotion.skus.length)
        
                for (let i = 0; i<applyCounter;i++){
                    this.items[promotion.skus[0]].usedForPromotion += promotion.skus.length
                    this.total -= promotion.skus.length*this.items[promotion.skus[0]].unitPrice
                    this.total += promotion.price
                }
                promotionApplied = true
            }
        })

        if (promotionApplied) return

        // mutli SKU promotions
        multiSkuPromotions.forEach(promotion=> {
        
            // get list of available items for promotion
            let availableItems = this.getAvailableItemsForPromotion()
    
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
                promotion.skus.forEach(sku => {
                    this.items[sku].usedForPromotion += 1
                    this.total -= this.items[sku].unitPrice
                })
        
                this.total += promotion.price
            }
        })
        
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

    // applySingleSkuPromotion(promotion){
    //     if (!promotion) {
    //         throw Error("Missing promotion");
    //     }
    //     let apply = parseInt((this.items[promotion.skus[0]].amount - this.items[promotion.skus[0]].usedForPromotion) / promotion.skus.length)
        
    //     for (let i = 0; i<apply;i++){
    //         this.items[promotion.skus[0]].usedForPromotion += promotion.skus.length
    //         this.total -= promotion.skus.length*this.items[promotion.skus[0]].unitPrice
    //         this.total += promotion.price
    //     }
        
    // }

    // applyMultiSkuPromotion(promotion){
    //     if (!promotion) {
    //         throw Error("Missing promotion");
    //     }
    //     promotion.skus.forEach(sku => {
    //         this.items[sku].usedForPromotion += 1
    //         this.total -= this.items[sku].unitPrice
    //     })

    //     this.total += promotion.price
    // }

    printCart(){
        console.log("Items: ", this.items, "\nTotal: ",this.total+"\n")
    }
}

module.exports = Cart