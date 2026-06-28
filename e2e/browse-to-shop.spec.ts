import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test.describe('browse to shop flow', () => {
  test('home page loads and navigates to shop', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Crown Clothing', exact: true })).toBeVisible();
    await page.getByRole('link', { name: /shop collection/i }).click();

    await expect(page).toHaveURL(/\/shop/);
    await expect(page.getByLabel('Filter by category')).toBeVisible();
  });

  test('shop filters render', async ({ page }) => {
    await page.goto('/shop');

    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByLabel('Sort products')).toBeVisible();
  });

  test('checkout page shows empty cart message', async ({ page }) => {
    await page.goto('/checkout');

    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /continue shopping/i })).toBeVisible();
  });
});