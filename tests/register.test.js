import { expect, test } from '@playwright/test';

test.describe('User Registration Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/register');
        await page.waitForLoadState('networkidle'); 
    });

    // Check if the Registration Page Loads Properly
    test('should display registration form correctly', async ({ page }) => {
        await page.waitForSelector('h2'); // Ensure the heading is rendered before asserting
        await expect(page.locator('h2')).toHaveText('Create Your Account');
        await expect(page.locator('input[name="username"]')).toBeVisible();
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="phone"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toHaveText('Register');
    });

    //  Check Invalid Phone Number
    test('should show error for invalid phone number', async ({ page }) => {
        await page.fill('input[name="username"]', 'testuser');
        await page.fill('input[name="email"]', 'testuser@example.com');
        await page.fill('input[name="phone"]', '1234'); // Invalid phone
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        await page.waitForSelector('.text-red-500', { timeout: 5000 });
        await expect(page.locator('.text-red-500')).toHaveText(/Phone number must be between 10-15 digits/);
    });

    // Check Successful Registration
    test('should successfully register a new user', async ({ page }) => {
        const timestamp = Date.now(); // Generate unique email for test
        const uniqueEmail = `newuser${timestamp}@example.com`;

        await page.fill('input[name="username"]', 'newuser');
        await page.fill('input[name="email"]', uniqueEmail);
        await page.fill('input[name="phone"]', '1234567890');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        await page.waitForSelector('.text-green-500', { timeout: 5000 }); 
        await expect(page.locator('.text-green-500')).toContainText(/Successfully registered/i);
        await page.waitForTimeout(2000); 
        await expect(page).toHaveURL('http://localhost:5173/login'); 
    });

    //  Prevent Duplicate Registration
    test('should show error for duplicate email registration', async ({ page }) => {
        await page.fill('input[name="username"]', 'duplicateuser');
        await page.fill('input[name="email"]', 'bibhakta@gmail.com'); 
        await page.fill('input[name="phone"]', '1234567890');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');

        await page.waitForSelector('.text-red-500', { timeout: 5000 });
        await expect(page.locator('.text-red-500')).toContainText(/Email is already in use|Phone number is already in use/i);
    });

    test('should navigate to login page when clicking on "Login" link', async ({ page }) => {
        await page.click('text=Login'); 
        await page.waitForURL('http://localhost:5173/login'); 
        await expect(page).toHaveURL('http://localhost:5173/login'); 
    });

});
