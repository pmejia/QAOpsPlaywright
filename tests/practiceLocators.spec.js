import { test, expect } from '@playwright/test';

test('Localizar por role', async ({ page }) => {
  await page.goto("https://playwright.dev/");
  const buttonGetStarted = await page.getByRole('link', { name: 'Get started' });
  await expect(buttonGetStarted).toBeVisible();
  await buttonGetStarted.click();
  await expect(page).toHaveURL("https://playwright.dev/docs/intro");

});

test('Localizador por texto', async({page})=>{
  await page.goto('https://books.toscrape.com/');
  const firstBook = await page.locator('article.product_pod').first();
  const firstBookPrice = await firstBook.locator('.price_color');
  await expect(firstBookPrice).toBeVisible;
  console.log(await firstBookPrice.textContent());
  await expect(firstBookPrice).toHaveText(/^£/);

});