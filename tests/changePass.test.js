import { expect, test } from '@playwright/test';

test.describe('Change Password Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/changepass');
        await page.waitForLoadState('networkidle');
    });

    // 1. Ensure the Change Password Form Loads Correctly
    test('should display change password form correctly', async ({ page }) => {
        await expect(page.locator('h2')).toHaveText('Change Password');
        await expect(page.locator('input[name="oldPassword"]')).toBeVisible();
        await expect(page.locator('input[name="newPassword"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toHaveText('Change Password');
    });

    // 2. Show validation error if fields are empty
    test('should show validation error if fields are empty', async ({ page }) => {
        await page.click('button[type="submit"]'); 
        await page.waitForTimeout(1000);

        // Ensure input validation works
        await expect(page.locator('input[name="oldPassword"]')).toHaveAttribute('required');
        await expect(page.locator('input[name="newPassword"]')).toHaveAttribute('required');
    });

    // 3. Show error for incorrect old password
    test('should show error for invalid token', async ({ page }) => {
        await page.fill('input[name="oldPassword"]', 'wrongpassword');
        await page.fill('input[name="newPassword"]', 'newSecurePassword123');
        await page.click('button[type="submit"]');

        await page.waitForSelector('.text-red-500', { timeout: 5000 });
        await expect(page.locator('.text-red-500')).toContainText(/Invalid Token/i);
    });

  

});
