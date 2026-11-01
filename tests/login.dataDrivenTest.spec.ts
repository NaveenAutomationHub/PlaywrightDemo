import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../pages/sauceLogin';
import loginData from '../test-data/loginData.json';

loginData.forEach((data) => {
  //const { username, password, run } = data;

  if (!data.run) return;

  test(`Sauce Demo login test: ${data.username}`, async ({ page }) => {
    const sauceLoginPage = new SauceLoginPage(page);
    await sauceLoginPage.navigateToLoginPage();
    await sauceLoginPage.login(data.username, data.password);

    if (data.expected === 'success') {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    } else {
      await expect(sauceLoginPage.errorMessage).toBeVisible();
      const errorText = await sauceLoginPage.errorMessage.textContent();
      console.log('Login error message:', errorText);
    }
  });
});