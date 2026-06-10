import { Page, Locator } from "@playwright/test";

export class DashboardCart {
    page: Page;
    productList: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator("div li");
        this.checkoutButton = page.locator("text=Checkout");

    }
    async isProductVisible(productName: string) {
        await this.productList.first().waitFor();
        return await this.page.locator(`h3:has-text('${productName}')`).isVisible();

    }

    async checkoutClick() {
        await this.checkoutButton.click();
    }


}
