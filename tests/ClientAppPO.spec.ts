import { test, expect, type Page } from "@playwright/test";
import { customTest } from "../utils_ts/test-data";
import { POManager } from "../pageobjects_ts/POManager";

//page: Page;
//json->string-> js object
//const dataSet = JSON.parse(JSON.stringify(require('../utils_ts/placeorderTestData.json')));
//import dataSet from '../utils_ts/placeorderTestData.json';
import dataSet from '../utils_ts/placeorderTestData.json' with { type: 'json' };
for (const data of dataSet) {



   test(`Client App Login ${data.productName}`, async ({ page }) => {

      const poManager = new POManager(page);

      const products = page.locator(".card-body");

      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(data.useremail, data.password);

      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(data.productName);
      await dashboardPage.navigateToCart();

      const dashboardCart = poManager.getDashboardCart();
      await dashboardCart.isProductVisible(data.productName);
      expect(await dashboardCart.isProductVisible(data.productName)).toBeTruthy();
      await dashboardCart.checkoutClick();

      const dashboardCheckout = poManager.getDashboardCheckout();
      await dashboardCheckout.shippingPaymentData("ind", "India");
      const email = await dashboardCheckout.getUserEmail();
      await expect(email).toBe(data.useremail);
      await dashboardCheckout.fillDataCheckout();

      const dashboardThankyou = poManager.getDashboardThankyou();
      await expect(dashboardThankyou.getThankyouMessage()).toContainText(" Thankyou for the order. ");
      const orderId = await dashboardThankyou.getOrderId();
      await dashboardThankyou.navigateToMyOrders();

      const dashboardMyOrders = poManager.getDashboardMyOrders();
      await dashboardMyOrders.searchOrderById(orderId);

   });


}

customTest('@Web Client App Login', async ({ page, testDataForOrder }) => {

   const poManager = new POManager(page);

   const products = page.locator(".card-body");

   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(testDataForOrder.useremail, testDataForOrder.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   await dashboardPage.navigateToCart();

   const dashboardCart = poManager.getDashboardCart();
   await dashboardCart.isProductVisible(testDataForOrder.productName);
   expect(await dashboardCart.isProductVisible(testDataForOrder.productName)).toBeTruthy();
   await dashboardCart.checkoutClick();

   const dashboardCheckout = poManager.getDashboardCheckout();
   await dashboardCheckout.shippingPaymentData("ind", "India");
   const email = await dashboardCheckout.getUserEmail();
   await expect(email).toBe(testDataForOrder.useremail);
   await dashboardCheckout.fillDataCheckout();
});

