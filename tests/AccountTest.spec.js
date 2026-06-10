import { test, expect, request } from '@playwright/test';
import { APIUtils2 } from '../utils/APIUtils2';

const GMAIL_USER = 'abcdefg.correo@gmail.com';
const GMAIL_PASS = 'LearningAlways9&';

const loginPayloadYahoo = { email: 'dummie@yahoo.com', password: 'Abcdef5!' };
const bookingPayLoad = { eventId: "", customerName: "Yahoo user", customerEmail: "user@yahoo.com", customerPhone: "+91-9876543210", quantity: 1 };

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

let bookingId;
let token;

async function loginAs(page, user) {
    await page.goto(`${BASE_URL}`);
    await page.getByPlaceholder("you@email.com").fill(user);
    await page.getByLabel("Password").fill(GMAIL_PASS);
    await page.locator("#login-btn").click();
    await expect(page.locator("span:has-text('Browse Events →')")).toBeVisible();
}

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils2(apiContext, loginPayloadYahoo);
    token = await apiUtils.getToken();
    const eventId = await apiUtils.getEvent(token);
    bookingPayLoad.eventId = eventId;
    bookingId = await apiUtils.createBooking(token, bookingPayLoad);

});

test('Security test access denied', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await loginAs(page, GMAIL_USER);
    await page.goto(`${BASE_URL}/bookings/${bookingId}`, { waitUntil: 'networkidle' });
    await expect(await page.locator("h3").filter({ hasText: /access denied/i })).toBeVisible();
    await expect(await page.locator("p").filter({ hasText: /not authorized/i })).toHaveText(/You are not authorized to view this booking/i);
    await page.pause();



});