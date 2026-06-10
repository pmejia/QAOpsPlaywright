export class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[type='submit']");
        this.userEmail = page.locator("[type='email']");
        this.password = page.locator("[id='userPassword']");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(useremail, password) {
        await this.userEmail.fill(useremail);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
//module.exports{LoginPage};