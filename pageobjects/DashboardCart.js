export class DashboardCart{
    
    constructor(page){
        this.page = page;
        this.productList = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");
       
    }
    async isProductVisible(productName){
        await this.productList.first().waitFor();
        return await this.page.locator(`h3:has-text('${productName}')`).isVisible();

    }

    async checkoutClick(){
        await this.checkoutButton.click();
    }

  
}
//module.exports = { DashboardCart };