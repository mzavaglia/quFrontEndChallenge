import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';

test('Grid Item Test', async ({ page }) => {
  await page.goto(baseUrl + 'grid');

  // Flexible locator for grid items, position 7 (0-based index 6)
  const grid = page.locator('(//*[@id="menu"]//div)[7]');

  await expect(grid).toBeVisible();

  // Assert product name
  await expect(grid.locator('//h4["item-name"]')).toHaveText('Super Pepperoni');

  // Assert price is $10
  await expect(grid.locator('//p["item-price"]')).toHaveText('$10');
});