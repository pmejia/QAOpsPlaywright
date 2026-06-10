import {test, expect} from '@playwright/test';


test("Calendar validations", async ({page})=>
{
    const monthNumber="06";
    const date="15";
    const year="2027";
    const fecha= `${year}-${monthNumber}-${date}`;
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    //await page.locator(".react-calendar__tile").nth(Number(monthNumber)-1).click();
    await page.locator(".react-calendar__tile").filter({hasText: "June"}).click();
    await page.locator('abbr').filter({ hasText: date }).click();
    const hiddenValue = await page.locator('input[name="date"]').inputValue();
    expect(hiddenValue).toBe(fecha);
   //await expect(page.getByText(fecha)).toBeVisible();


})