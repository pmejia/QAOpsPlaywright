export class DashboardThankyou {
    constructor(page) {
        this.page = page;
        this.thankyouMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = page.locator("button[routerLink*='myorders']");
    }

    getThankyouMessage() {
        return this.thankyouMessage;
    }

    async getOrderId() {
       const text = await this.orderId.textContent();
       return text.replace(/\|/g, "").trim();
         
    }
    async navigateToMyOrders() {        
        await this.myOrdersButton.click();
    }
}
//export default { DashboardThankyou };