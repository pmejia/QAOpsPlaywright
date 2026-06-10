import { test, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';;

test.describe.configure({mode: 'serial'});

test("@Web Popup validation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    //await page.on("dialog", dialog => dialog.dismiss());
    
    page.on("dialog", async (dialog) => {
        console.log("Mensaje del popup:", dialog.message()); // ver mensaje en consola
        await page.waitForTimeout(5000); // espera 5 segundos antes de aceptar
        await dialog.accept();
    });
    
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    //iframes
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();

    console.log(textCheck.split(" ")[1]);
});

test("Screenshot & Visual comparison", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    //========screenshot locator level
    await page.getByPlaceholder("Hide/Show Example").screenshot({ path: 'partialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    //========screenshot whole page
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});

test("Visual", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

}

);