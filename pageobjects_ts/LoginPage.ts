import { Page, type Locator } from "@playwright/test";

export class LoginPage {
    page: Page;
    signInbutton: Locator;
    userEmail: Locator;
    password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator("[type='submit']");
        this.userEmail = page.locator("[type='email']");
        this.password = page.locator("[id='userPassword']");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(useremail: string, password: string) {
        await this.userEmail.fill(useremail);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
