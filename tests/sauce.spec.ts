import{test, Locator, expect}from'@playwright/test';    
//test- Used to create test cases.
//expect- Used to create assertions.
//Locator -ex: usernameInput variable will contain a Playwright Locator object
//@playwright/test is a package (module) that contains Playwright's testing features.

test('Sauce Demo',async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    const usernameInput:Locator = page.locator('input#user-name');
    const passwordInput:Locator = page.locator('input#password');
    const loginButton:Locator = page.locator('input[type="submit"]');

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
});