import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../pages/sauceLogin';
import { LoginData, readExcel } from '../utils/excelReader';

const testData: LoginData[] = readExcel('./test-data/LoginData.xlsx', 'Sheet1');

test.describe('Login Tests', () => {

    for (const data of testData) {
        test(`Login test for - ${data.username}`, async ({ page }) => {
            test.skip(!data.run, 'Run Flag=NO');

            const loginPage = new SauceLoginPage(page);

            await test.step('Go to login page', async () => {
                await loginPage.navigateToLoginPage();
            });

            await test.step('Perform Login', async () => {
                await loginPage.login(data.username, data.password);
            });

            await test.step('Validate Result', async () => {
                if (data.expected === 'success') {
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    await expect(loginPage.errorMessage).toBeVisible();
                    const errorText = await loginPage.errorMessage.textContent();
                    console.log('Login error message:', errorText);
                }
            });
        });
    }

});