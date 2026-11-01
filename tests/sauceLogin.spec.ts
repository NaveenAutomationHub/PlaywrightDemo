import { expect, test } from '@playwright/test';
import { SauceLoginPage } from '../pages/sauceLogin';
import credentials from '../test-data/credentials.json';

test('Sauce Demo valid login test', async ({ page }) => {

    const sauceLoginPage = new SauceLoginPage(page);
    //const { username, password } = credentials;

    await sauceLoginPage.navigateToLoginPage();
    await sauceLoginPage.login(
        
        credentials.valid_credentials.username,
        credentials.valid_credentials.password
    );
    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');

});
test('Sauce Demo Invalid login test', async ({ page }, testInfo) => {

    const sauceLoginPage = new SauceLoginPage(page);

    await sauceLoginPage.navigateToLoginPage();
    await sauceLoginPage.login(
        credentials.Invalid_credentials.username,
        credentials.Invalid_credentials.password
    );

    await expect(sauceLoginPage.errorMessage).toBeVisible();

    const errorText = await sauceLoginPage.errorMessage.textContent();
    console.log('Login error message:', errorText);


})