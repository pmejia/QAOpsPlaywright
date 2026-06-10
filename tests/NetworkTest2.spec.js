import { test, expect } from '@playwright/test';

test('Security test request intercept', async ({page}) => {

    // login and reach orders page
    const email = "abcdef.mejia@gmail.com";
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill("abcdef.mejia@gmail.com");
    await page.locator("[id='userPassword']").fill("Learning@830$3mK2");
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerLink*='myorders']").click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
         async route => await route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b53f6765465b6' }));
    //await page.getByRole('button', { name: 'View' }).first().click();
    await page.locator("button:has-text('View')").first().click();
    await expect(page.getByText("You are not authorize to view this order")).toBeVisible();
    await page.pause();

});