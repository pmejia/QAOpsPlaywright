import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';

const loginPayload = { userEmail: 'abcdef.mejia@gmail.com', userPassword: 'Learning@830$3mK2' };
const orderPayload = { orders: [{ country: "Argentina", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;


test.beforeAll(async () => {
   //Login API 
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);


});

test('Place the order', async ({ page }) => {
   /*  const apiUtils = new APIUtils(apiContext, loginPayLoad);
    const orderId =createdOrder(orderPayLoad); */

   await page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, response.token);
   await page.goto("https://rahulshettyacademy.com/client");

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69c4475af86ba51a6529c076",
      async route => {
         const response = await page.request.fetch(route.request());
         let body = JSON.stringify(fakePayLoadOrders);
         await route.fulfill(
            {
               response,
               body,
            });
         //intercepting response - API response -> fake response -> browser-> render data on front end

      });

   await page.locator("button[routerLink*='myorders']").click();
   //await page.pause();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69c4475af86ba51a6529c076");
   //await page.locator("tbody").first().waitFor();
   //const email=  "abcdef.mejia@gmail.com";
   const rows = page.locator("tbody tr");

   console.log(await page.locator(".mt-4").textContent());

  
});
