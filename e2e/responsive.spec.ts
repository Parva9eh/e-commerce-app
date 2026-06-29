import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile-small', width: 320, height: 568 },
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
] as const;

const routes = ['/', '/shop', '/shop/hats', '/shop/hats/1', '/auth', '/checkout'] as const;

for (const viewport of viewports) {
  test.describe(`responsive layout (${viewport.name})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
    });

    for (const route of routes) {
      test(`${route} avoids horizontal overflow`, async ({ page }) => {
        const response = await page.goto(route);
        expect(response?.status()).toBeLessThan(400);

        const hasOverflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return doc.scrollWidth > doc.clientWidth + 1;
        });

        expect(hasOverflow).toBe(false);
      });
    }
  });
}

test('shop product previews span the full content width on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/shop');

  const layout = await page.evaluate(() => {
    const preview = document.querySelector('section div');
    const bodyWidth = document.body.getBoundingClientRect().width;
    const previewWidth = preview?.getBoundingClientRect().width ?? 0;

    return {
      bodyWidth,
      previewWidth,
      fillsWidth: previewWidth >= bodyWidth - 24,
    };
  });

  expect(layout.fillsWidth).toBe(true);
});

test('home directory uses a single column on very small screens', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  const directoryLayout = await page.evaluate(() => {
    const items = [...document.querySelectorAll('a[aria-label^="Shop "]')];
    const widths = items.map((item) => item.getBoundingClientRect().width);
    const uniqueWidths = [...new Set(widths.map((width) => Math.round(width)))];

    return {
      itemCount: items.length,
      uniqueWidths,
    };
  });

  expect(directoryLayout.itemCount).toBe(5);
  expect(directoryLayout.uniqueWidths.length).toBe(1);
});