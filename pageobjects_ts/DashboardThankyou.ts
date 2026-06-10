import {Page, Locator} from "@playwright/test";
export class DashboardThankyou {

    page:Page;
    thankyouMessage: Locator;
    orderId : Locator;
    myOrdersButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankyouMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = page.locator("button[routerLink*='myorders']");
    }

    getThankyouMessage() {
        return this.thankyouMessage;
    }

    async getOrderId() {
       const text: any  = await this.orderId.textContent();
       return text.replace(/\|/g, "").trim();
         
    }
    async navigateToMyOrders() {        
        await this.myOrdersButton.click();
    }
}
