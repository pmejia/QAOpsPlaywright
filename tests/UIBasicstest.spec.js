import {test, expect} from '@playwright/test';


test('@Web Browser Context Playwright test', async ({browser})=>
{
    
    //chrome - plugins/cookies
    const context= await browser.newContext();
    const page= await context.newPage();
    //aborting the request
    //page.route('**/*.css', route => route.abort());

    //abort jpg files
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());

    const cardTitles = page.locator(".card-body a");
    //listen for all the requests and get the url
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    const userName= page.locator("#username");
    const signIn= page.locator("#signInBtn");

    //css locators
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    //await page.locator("[type='password']").fill("Learning...");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*= 'block']").textContent());
    await expect(page.locator("[style*= 'block']")).toContainText('Incorrect');
    //await page.waitForTimeout(5000);

    //fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    //await page.waitForTimeout(5000);
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
  
    console.log(allTitles);
});
test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");


});
test('@Web UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName= page.locator("#username");
    const signIn= page.locator("#signInBtn");
    const documentLink= page.locator("[href*='documents-request']");
    
    //Dropdown
    const dropdown = await page.locator("select.form-control").selectOption("consult");
    
    //radio buttons
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    // 2nd method using isChecked returning boolean value
    console.log(await page.locator(".radiotextsty").last().isChecked());
    //assertion 1st method using expect
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");
         //await page.pause();

});
test('Child windows handling', async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink= page.locator("[href*='documents-request']");
    const [newPage]= await Promise.all(
    [
        context.waitForEvent('page'),//listen for any new page
        documentLink.click(),
    ])
    // new page is opened
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    await page.locator("#username").fill(domain);
    //await page.pause();
    //inputValue permite agarrar el valor introducido despues de abrir el DOM
    //utilizado en este caso en vez de textContent
    console.log(await page.locator("#username").inputValue());
       


});