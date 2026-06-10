export class DashboardCheckout {

    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.useremail = page.locator(".user__name label[type='text']");
        this.cardInfo = page.locator(".field input");
        this.placeOrderButton = page.locator(".action__submit");
    }

    async shippingPaymentData(initialCountry, countryName) {

        await this.country.pressSequentially(initialCountry, { delay: 150 });
        await this.dropdown.waitFor();

        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                //click
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }


    }

    async getUserEmail() {
        return await this.useremail.textContent();
    }

    async fillDataCheckout() {
        await this.cardInfo.first().fill("123456789");
        await this.cardInfo.nth(2).fill("0001");
        await this.cardInfo.nth(3).fill("YUYITA");
        await this.placeOrderButton.click();

    }
}
//module.exports = { DashboardCheckout };