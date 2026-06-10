import { Page, Locator } from "@playwright/test";

export class DashboardPage {

    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;

    constructor(page:Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerLink*='cart']");
    }

    async searchProductAddCart(productName: string) {

        const titles = await this.productsText.allTextContents();
        console.log(titles);

        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; ++i) {
            //Chained locators
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                console.log("Ingresa")
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }


    }
    async navigateToCart() {
        await this.cart.click();
    }

}

