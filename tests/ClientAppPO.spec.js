import { test, expect } from '@playwright/test';
import {customtest} from'../utils/test-data';
import { POManager } from '../pageobjects/POManager';
//json->string-> js object
//const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

import dataSet from '../utils_ts/placeorderTestData.json' with { type: 'json' };

for (const data of dataSet) {



test(`Client App Login ${data.productName}`, async ({ page }) => {
   
   const poManager = new POManager(page);
   
   const products = page.locator(".card-body");
   
   const loginPage = poManager.getLoginPage(page);
   await loginPage.goTo();
   await loginPage.validLogin(data.useremail, data.password);
   
   const dashboardPage = poManager.getDashboardPage(page);
   await dashboardPage.searchProductAddCart(data.productName);
   await dashboardPage.navigateToCart();

   const dashboardCart = poManager.getDashboardCart(page);
   await dashboardCart.isProductVisible(data.productName);
   expect (await dashboardCart.isProductVisible(data.productName)).toBeTruthy();
   await dashboardCart.checkoutClick();

   const dashboardCheckout = poManager.getDashboardCheckout(page);
   await dashboardCheckout.shippingPaymentData("ind","India");
   const email = await dashboardCheckout.getUserEmail();
   await expect(email).toBe(data.useremail);
   await dashboardCheckout.fillDataCheckout();
   
   const dashboardThankyou = poManager.getDashboardThankyou(page);
   await expect(dashboardThankyou.getThankyouMessage()).toContainText(" Thankyou for the order. ");
   const orderId = await dashboardThankyou.getOrderId();
   await dashboardThankyou.navigateToMyOrders();

   const dashboardMyOrders = poManager.getDashboardMyOrders(page);   
   await dashboardMyOrders.searchOrderById(orderId);
    
 });

 
}

customtest('@Web Client App Login', async ({ page, testDataForOrder }) => {
   
   const poManager = new POManager(page);
   
   const products = page.locator(".card-body");
   
   const loginPage = poManager.getLoginPage(page);
   await loginPage.goTo();
   await loginPage.validLogin(testDataForOrder.useremail, testDataForOrder.password);
   const dashboardPage = poManager.getDashboardPage(page);
   await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   await dashboardPage.navigateToCart();

   const dashboardCart = poManager.getDashboardCart(page);
   await dashboardCart.isProductVisible(testDataForOrder.productName);
   expect (await dashboardCart.isProductVisible(testDataForOrder.productName)).toBeTruthy();
   await dashboardCart.checkoutClick();

   const dashboardCheckout = poManager.getDashboardCheckout(page);
   await dashboardCheckout.shippingPaymentData("ind","India");
   const email = await dashboardCheckout.getUserEmail();
   await expect(email).toBe(testDataForOrder.useremail);
   await dashboardCheckout.fillDataCheckout();
});

