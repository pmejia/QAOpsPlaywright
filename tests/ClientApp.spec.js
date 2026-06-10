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

test.skip('Client App Login', async ({page})=>
{
    
   const email=  "abcdef.mejia@gmail.com";
   const products = page.locator(".card-body");
   const productName = 'ZARA COAT 3';
    
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("[type='email']").fill("abcdef.mejia@gmail.com");
     await page.locator("[id='userPassword']").fill("Learning@830$3mK2");
     await page.locator("[type='submit']").click();
     await page.waitForLoadState('networkidle');
     await page.locator(".card-body b").first().waitFor();
     const titles = await page.locator(".card-body b").allTextContents();
     console.log(titles);
      
     //const titles=await products.allTextContents();
     //console.log(titles);
     const count= await products.count();
     console.log(count);
     for(let i = 0; i <count; ++i)
     {
        //Chained locators
        if(await products.nth(i).locator("b").textContent() === productName)
        {
           console.log("Ingresa")
            //add to cart
           await products.nth(i).locator("text= Add To Cart").click();
           break;
        }
     }
     await page.locator("[routerLink*='cart']").click();
     await page.locator("div li").first().waitFor();

     const bool= page.locator("h3:has-text('ZARA COAT 3')").isVisible();
     expect(bool).toBeTruthy();

     await page.locator("text=Checkout").click();
     await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
     const dropdown = page.locator(".ta-results");
     await dropdown.waitFor();
     const optionsCount= await dropdown.locator("button").count();
     for(let i=0; i<optionsCount; ++i)
     {
      const text= await dropdown.locator("button").nth(i).textContent();
      if (text === " India")
      {
         //click
         await dropdown.locator("button").nth(i).click();
         break;
      }
     }
     expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    
     await page.locator(".field input").nth(1).fill("1234");
     await page.locator(".field input").nth(2).fill("Natita Tototita");
     await page.locator(".field input").nth(3).fill("YUYITA");
    // await page.pause();
     await page.locator(".action__submit").click();
     
     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
     const orderIdd=await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); 
     const orderId = orderIdd.replace(/\|/g, "");
     console.log(orderId.trim());
    
     await page.locator("button[routerLink*='myorders']").click();
     await page.waitForLoadState('networkidle');
     await page.locator("tbody").first().waitFor();
     const rows= page.locator("tbody tr");
     const rowsCount= await rows.count();

     for(let j=0; j<rowsCount; ++j){
         const rowOrderId= await rows.nth(j).locator("th").textContent();
         console.log(rowOrderId);
         if(rowOrderId.includes(orderId.trim()))
         {
            console.log("Ingreso a la orden correcta");
            await rows.nth(j).locator("text= View").click();
            break;
         }
         

     };
     await page.pause();
     
     //await page.waitForTimeout(5000);
     

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