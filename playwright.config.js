// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries: 2,

  timeout: 30*1000,
  expect:{
    timeout: 5000,
  },
  reporter:'html',

  use: {
    
    browserName:'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

  
});
//module.exports=config
export default config

