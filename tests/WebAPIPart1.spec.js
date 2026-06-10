import {test, expect, request} from '@playwright/test';
import {APIUtils} from '../utils/APIUtils';

const loginPayload = { userEmail: 'abcdef.mejia@gmail.com', userPassword: 'Learning@830$3mK2' };
const orderPayload = {orders:[{country:"Argentina",productOrderedId:"6960eac0c941646b7a8b3e68"}]}

let response;


test.beforeAll( async()=>
{
   //Login API 
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);
  

});

test('@API Place the order', async ({page})=>
{
  /*  const apiUtils = new APIUtils(apiContext, loginPayLoad);
   const orderId =createdOrder(orderPayLoad); */

   await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").first().waitFor();
    const rows= page.locator("tbody tr");
    const email=  "abcdef.mejia@gmail.com";
   
    const rowsCount= await rows.count();

     for(let j=0; j<rowsCount; ++j){
         const rowOrderId= await rows.nth(j).locator("th").textContent();
         console.log(rowOrderId);
         if(rowOrderId.includes(response.orderId.trim()))
         {
            console.log("Ingreso a la orden correcta");
            await rows.nth(j).locator("text= View").click();
            break;
         }
         

     }
     const orderDetails= await page.locator(".col-text").textContent();
     await page.pause();
     expect(response.orderId.includes(orderDetails.trim())).toBeTruthy();
     
     
  
     

});
