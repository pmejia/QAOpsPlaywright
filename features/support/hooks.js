import * as playwright from '@playwright/test';
import { POManager } from '../../pageobjects/POManager.js';
import { Before, After, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { resourceLimits } from 'node:worker_threads';



Before(async function () {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
});
BeforeStep(function () {

});

AfterStep(async function ({result}) {
    if ( result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
})

After(function () {
    console.log("I am last to execute");
});