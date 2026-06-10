import {test, expect} from '@playwright/test';


test('Register test', async ({browser})=>
{
    
    //chrome - plugins/cookies
    const context= await browser.newContext();
    const page= await context.newPage();
    
    //const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    
    // const userName= page.locator("#username");
    // const signIn= page.locator("#signInBtn");

    // //css locators
     await page.locator(".text-reset").click();
     await page.locator("[type='firstName']").fill("Litamar");
     await page.locator("[type='lastName']").fill("Mejia");
     await page.locator("[type='email']").fill("abcd.mejia@gmail.com");
     await page.locator("[id='userMobile']").fill("123567890");
     await page.locator("select[class*='custom-select']").selectOption('Engineer');
     await page.locator("input[value='Female']").click();
     await page.locator("[id='userPassword']").fill("Learning");
     await page.locator("[id='confirmPassword']").fill("Learning");
     await page.locator("[type='checkbox']").check();
     await page.locator("[type='submit']").click();
     await page.waitForTimeout(5000);
     

});

test('Client App Login', async ({page})=>
{
    
   const email=  "abcdef.mejia@gmail.com";
   const products = page.locator(".card-body");
     const productName = 'ZARA COAT 3';
    
     await page.goto("https://rahulshettyacademy.com/client");
     await page.getByPlaceholder("email@example.com").fill("abcdef.mejia@gmail.com");
     await page.getByPlaceholder("enter your passsword").fill("Learning@830$3mK2");
     await page.getByRole("button", {name: "login"}).click();
     await page.waitForLoadState('networkidle');
     
     
     await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name: " Add To Cart"}).click();
     await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
     
     await page.locator("div li").first().waitFor();
     await expect(page.getByText("ZARA COAT 3")).toBeVisible();
     await page.getByRole("button", {name: "Checkout"}).click();
     await page.getByPlaceholder("Select Country").pressSequentially("ind");
     
     await page.getByRole("button", {name: "India"}).nth(1).click();
     await page.getByText("PLACE ORDER").click();
     await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
   
     
    
      
    


    
     
     

});

test('Select item test', async ({page})=>
{
    
    const itemsTitles = page.locator(".card-body b");
    
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    
    // //css locators
   
     await page.locator("[type='email']").fill("abcdef.mejia@gmail.com");
     await page.locator("[id='userPassword']").fill("Learning@830$3mK2");
     await page.locator("[type='submit']").click();
     //await page.waitForLoadState('networkidle');
     await itemsTitles.first().waitFor();
      
     const allTitles=await itemsTitles.allTextContents();
     console.log(allTitles);
       
     await page.waitForTimeout(5000);
     

});