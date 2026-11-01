import { test } from '@playwright/test';

test('Google Search', async ({ page }) => {

  await page.goto('https://www.google.com');

  await page.locator('textarea[name="q"]').fill('playwright');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(5000);

  console.log(await page.title());
  console.log(page.url());

});