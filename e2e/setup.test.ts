import { expect, test } from '@playwright/test';

test('setup page', async ({ page }) => {
	await page.goto('/setup');
	await expect(page.locator('h1')).toBeVisible();
});

test('setup should be done once', async ({ page }) => {
	await page.goto('/setup');
	// wait a bit
	await page.waitForTimeout(1000);
	// get redirected to /
	await expect(page).toHaveURL('/');
});
