import {test, expect} from '@playwright/test';

async function login(page)
{
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("abcdefg.correo@gmail.com");
    await page.getByLabel("Password").fill("LearningAlways9&");
    await page.locator("#login-btn").click();

    await expect(page.locator("span:has-text('Browse Events →')")).toBeVisible();
      
}
async function futureDateValue(daysInFuture)
{
    const date = new Date();
    date.setDate(date.getDate() + daysInFuture);
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date - offset).toISOString();
    
    return localISOTime.slice(0, 16);
}

test('Playwright Special Locators', async ({page})=>
{
    await login(page);
    /*=====================================================================================
                                  Step 2: CREATE A NEW EVENT
    =======================================================================================*/
    await page.locator('a[href="/admin/events"]').click();
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("This is a test event created by Playwright.");
    await page.getByLabel("Category").selectOption("Concert");
    await page.getByLabel("city").fill("Madrid");
    await page.getByLabel("Venue").fill("Test Venue");
    await page.getByLabel("Event Date & Time").fill(await futureDateValue(2));
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.locator("p:has-text('Event Created!')")).toBeVisible();
    /*=====================================================================================
                                  Step 3 — Find the event card and capture seats
    =======================================================================================*/
    await page.locator("#nav-events").click();
    const  eventCards=await page.locator("[data-testid='event-card']");
    await expect(eventCards.first()).toBeVisible();

    const eventCreated = await page.locator("[data-testid='event-card']").filter({hasText: eventTitle});
    await expect(eventCreated).toBeVisible({timeout: 5000});
    
    const seatsBeforeBookingText= await eventCreated.locator("span", { hasText: /seats available/i }).textContent();  
    const seatsBeforeBooking = parseInt(await seatsBeforeBookingText);
       
    /*=====================================================================================
                                  Step 4 — Start booking
    =======================================================================================*/
    await eventCreated.locator("[data-testid='book-now-btn']").click();
    
    /*=====================================================================================
                                  Step 5 — Fill booking form
    =======================================================================================*/
    const ticketDefault= await page.locator("#ticket-count").textContent();
    expect(ticketDefault).toBe("1");
    await page.getByLabel("Full Name").fill("Yuya Mariana");
    await page.locator("#customer-email").fill("yuya@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
    await page.locator(".confirm-booking-btn").click();

    /*=====================================================================================
                                  Step 6 — Verify booking confirmation
    =======================================================================================*/
    const bookingReference = await page.locator(".booking-ref").first();
    await expect(await bookingReference).toBeVisible();
    const bookingRef=(await bookingReference.textContent()).trim();    
    
    /*=====================================================================================
                                  Step 7 — Verify in My Bookings
    =======================================================================================*/
    await page.getByRole('button', {name: "View My Bookings"}).click();
    const BASE_URL = "https://eventhub.rahulshettyacademy.com";
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    
    const bookingCards= await page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    const bookingCardWithRef = await bookingCards.filter({hasText: bookingRef});
    await expect(bookingCardWithRef).toBeVisible();
    
    
    expect(await bookingCardWithRef.locator("h3").textContent()).toMatch(eventTitle); 

    /*=====================================================================================
                                  Step 8 — Verify seat reduction
    =======================================================================================*/
    await page.goto(BASE_URL+"/events");
    const  eventCards2 = await page.locator("[data-testid='event-card']");
    await expect(eventCards2.first()).toBeVisible();

    const eventCreated2 = await eventCards2.filter({hasText: eventTitle});
    await expect(eventCreated2).toBeVisible();

    const seatsAfterBookingText= await eventCreated2.locator("span",{ hasText: /seats available/i }).textContent();
    const seatsAfterBooking = parseInt(seatsAfterBookingText);
   
    await expect(seatsAfterBooking).toBe(seatsBeforeBooking-1);   
});
