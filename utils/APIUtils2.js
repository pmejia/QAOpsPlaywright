import { expect } from '@playwright/test';
const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

export class APIUtils2
{
    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }

    async getToken()
    {   
        const loginResponse = await this.apiContext.post(`${API_URL}/auth/login`, 
         {                        
            data: this.loginPayLoad
        })
        
        await expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async getEvent(token)
    {         
       console.log(token);
      
       const eventResponse = await this.apiContext.get(`${API_URL}/events`,
        {
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        await expect(eventResponse.ok()).toBeTruthy();
        const eventResponseJson = await eventResponse.json();
        const eventId = eventResponseJson.data[0].id;
       
        return eventId;
    }

    async createBooking(token, bookingPayLoad)
    {  
        const bookingResponse = await this.apiContext.post(`${API_URL}/bookings`,
        {
            data: bookingPayLoad,
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })

        await expect(bookingResponse.ok()).toBeTruthy();
        const bookingResponseJson = await bookingResponse.json();
  
        return bookingResponseJson.data.id; 
    }
}
//module.exports = {APIUtils2};