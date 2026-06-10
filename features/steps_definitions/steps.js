/* const { When, Then } = require('@cucumber/cucumber');
const { POManager } = require( "../../pageobjects/POManager");
const { expect} = require('@playwright/test');
const playwright = require('@playwright/test'); */
import { When, Then, Given } from '@cucumber/cucumber';
import { POManager } from '../../pageobjects/POManager.js';
import { expect } from '@playwright/test';
import * as playwright from '@playwright/test';
import { chromium } from 'playwright';



Given('a login to Ecommerce application with {string} and {string}', { timeout: 20 * 1000 }, async function (usermail, password) {
    // Write code here that turns the phrase above into concrete actions

    const products = this.page.locator(".card-body");

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(usermail, password);
});
When('add {string} to Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the Cart', { timeout: 10 * 1000 }, async function (productName) {
    this.dashboardCart = this.poManager.getDashboardCart();
    await this.dashboardCart.isProductVisible(productName);
    await expect(await this.dashboardCart.isProductVisible(productName)).toBeTruthy();
    await this.dashboardCart.checkoutClick();
});
When('Enter valid details and Place the order', async function () {
    this.dashboardCheckout = this.poManager.getDashboardCheckout();
    await this.dashboardCheckout.shippingPaymentData("ind", "India");
    //const email = await this.dashboardCheckout.getUserEmail();
    //await expect(email).toBe(useremail);
    await this.dashboardCheckout.fillDataCheckout();


});
Then('Verify order is present in the OrderHistory', async function () {
    this.dashboardThankyou = this.poManager.getDashboardThankyou();
    await expect(this.dashboardThankyou.getThankyouMessage()).toContainText(" Thankyou for the order. ");
    this.orderId = await this.dashboardThankyou.getOrderId();
    await this.dashboardThankyou.navigateToMyOrders();

    /*  this.dashboardMyOrders = this.poManager.getDashboardMyOrders();
     await this.dashboardMyOrders.searchOrderById(this.orderId); */
    //expect(this.orderId.includes(await this.dashboardMyOrders.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', { timeout: 10 * 1000 }, async function (usermail, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
   
    //console.log(await this.page.title());


    await userName.fill(usermail);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify error message is displayed', { timeout: 10 * 1000 }, async function () {
    console.log(await this.page.locator("[style*= 'block']").textContent());
    await expect(this.page.locator("[style*= 'block']")).toContainText('Incorrect');
});



