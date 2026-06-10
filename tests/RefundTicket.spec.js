import {test, expect} from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const email ="abcdefg.correo@gmail.com";
const password="LearningAlways9&";


async function login(page) {
  
    await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByLabel('Password').fill(password);

  await page.locator('#login-btn').click();
  
  await expect(page.locator("span:has-text('Browse Events →')")).toBeVisible();
}

test('Single ticket booking is eligible for refund', async ({page})=>
{
    await login(page);
    // Step 2: Book first event with 1 ticket
    await page.goto(BASE_URL+"/events");
    await page.locator("[data-testid='event-card']").first().getByTestId("book-now-btn").click();
    await page.getByLabel("Full Name").fill("Yuya Mariana");
    await page.locator("#customer-email").fill("yuya@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
    await page.locator(".confirm-booking-btn").click();

    //Step 3: Navigate to booking details
    await page.getByRole("button", { name: 'View My Bookings' }).click();
    //await page.goto(BASE_URL+"/events");
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.locator("#booking-card").first().getByRole("button", {name: "View Details"}).click();
    await expect(page.locator("h2:has-text('Booking Information')")).toBeVisible();

    //Step 4: Validate booking reference
    const bookingRef = await page.locator(".py-1").textContent();
    const eventTitle = await page.locator("h1").textContent();
    await expect(bookingRef[0]).toBe(eventTitle[0]);

    //Step 5: Check refund eligibility
    await page.getByRole("button",{name: /Check eligibility for refund/i}).click();
    await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 500 });
    await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

    //Step 6: Validate result
    const refundResult = await page.locator("#refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toHaveText(/eligible for refund/i);
    await expect(refundResult).toHaveText(/single-ticket bookings qualify for a full refund/i);
});

test('Group ticket booking is NOT eligible for refund', async ({page})=>
{
    await login(page);
    // Step 2: Book first event with 1 ticket
    await page.goto(BASE_URL+"/events");
    await page.locator("[data-testid='event-card']").first().getByTestId("book-now-btn").click();
    await page.locator("button:has-text('+') ").click({ clickCount: 2 });

    await page.getByLabel("Full Name").fill("Yuya Mariana");
    await page.locator("#customer-email").fill("yuya@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
    await page.locator(".confirm-booking-btn").click();

    //Step 3: Navigate to booking details
    await page.getByRole("button", { name: 'View My Bookings' }).click();
    //await page.goto(BASE_URL+"/events");
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.locator("#booking-card").first().getByRole("button", {name: "View Details"}).click();
    await expect(page.locator("h2:has-text('Booking Information')")).toBeVisible();

    //Step 4: Validate booking reference
    const bookingRef = await page.locator(".py-1").textContent();
    const eventTitle = await page.locator("h1").textContent();
    await expect(bookingRef[0]).toBe(eventTitle[0]);

    //Step 5: Check refund eligibility
    await page.getByRole("button",{name: /Check eligibility for refund/i}).click();
    await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 500 });
    await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

    //Step 6: Validate result
    const refundResult = await page.locator("#refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText(/not eligible for refund/i);
    await expect(refundResult).toContainText(/.*group bookings \(3 tickets\) are non-refundable.*/i);
});