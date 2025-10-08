import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Grid from '../../PO/Grid';

test('Grid All Items Test', async ({ page }) => {
  await page.goto(baseUrl + 'grid');

  const gridItems = page.locator(Grid.gridItems);
  const count = await gridItems.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const item = gridItems.nth(i);

    // Title 
    const gridCardNumberText = (await item.locator(Grid.gridCardNumberText).first().innerText()).trim();
    expect(gridCardNumberText.length).toBeGreaterThan(0);

    // Price
    const priceText = (await item.locator(Grid.gridItemPrice).first().innerText()).trim();
    expect(priceText.length).toBeGreaterThan(0);

    // Image (src must be non-empty)
    const imageSource = await item.locator('//img').first().getAttribute('src');
    expect(imageSource && imageSource.trim().length).toBeTruthy();

    // Button (must be visible)
    await expect(item.locator(Grid.addToOrderButton).first()).toBeVisible();
  }
});