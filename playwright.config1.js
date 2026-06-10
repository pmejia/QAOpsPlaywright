// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { trace } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //retries:1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: 
  [
    {
      name: 'firefox',
      use: {

        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        //...devices['iPhone 12']

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      }
    },
{
  name :'chrome',
     use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        //permissions: ['geolocation'],
        trace: 'on',
        //viewport:{width: 720, height: 720}
       // ...devices['iPhone 12']
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      }
}



  ]

  ,


});
module.exports = config

