import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Checkout from '../../PO/checkout';

function parseNumberFromText(text: string) {
  const m = text.match(/-?\d[\d,]*(?:\.\d+)?/);
  return m ? parseFloat(m[0].replace(/,/g, '')) : NaN;
}

test('Cart Total Test', async ({ page }) => {
  await page.goto(baseUrl + 'checkout');

  // Flexible locator for item prices
  const itemCount = await page.locator(Checkout.cartItemPrices).count();
  let sum = 0;
  for (let i = 0; i < itemCount; i++) {
    const txt = (await page.locator(Checkout.cartItemPrices).nth(i).innerText()).trim();
    sum += parseNumberFromText(txt) || 0;
  }

  // Locator for displayed cart total
  const totalLocator = page.locator(Checkout.cartTotal);
  await expect(totalLocator).toBeVisible();
  const totalText = (await totalLocator.innerText()).trim();
  const total = parseNumberFromText(totalText);

  // Basic validations
  expect(itemCount).toBeGreaterThan(0);
  expect(Number.isFinite(sum)).toBeTruthy();
  expect(Number.isFinite(total)).toBeTruthy();

  // Assert sums match (allowing minor float rounding differences)
  await expect(sum).toBeCloseTo(total, 2);
});