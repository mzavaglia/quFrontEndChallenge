import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Checkout from '../../PO/checkout';
import { randomInt } from 'crypto';

test('Checkout Form Order Success', async ({ page }) => {
  await page.goto(baseUrl+'checkout');

  // Filling Billing Address section
  await page.locator(Checkout.fullName).fill('John Doe');
  await page.locator(Checkout.emailInput).fill('john.doe@example.com');
  await page.locator(Checkout.addressInput).fill('123 Main St');
  await page.locator(Checkout.cityInput).fill('Metropolis');
  await page.locator(Checkout.stateInput).fill('CA');
  await page.locator(Checkout.zipInput).fill('12345');

  // Filling Billing Address section
  await page.locator(Checkout.cardNameInput).fill('John Doe');
  await page.locator(Checkout.cardNumberInput).fill('4111111111111111');
  await page.locator(Checkout.expiryInput).selectOption({ index: randomInt(1,12) });
  await page.locator(Checkout.expireYearInput).fill('2025');
  await page.locator(Checkout.cvvInput).fill('123');

  // Validate if "Same as billing" checkbox exists and check it if not already checked.
  const sameAsBilling = page.locator(Checkout.sameAsBillingCheckbox);
  if (await sameAsBilling.count() > 0) {
    if (!(await sameAsBilling.isChecked())) {
      await sameAsBilling.check();
    }
  }

  // Send form to checkout and wait for order confirmation
  await page.locator(Checkout.submitOrderButton).click();
  await expect(page.locator(Checkout.orderConfirmationNumber)).toBeVisible({ timeout: 5000 });
  await expect(page.locator(Checkout.orderConfirmationNumber)).toHaveText(/\d{3,}/);
});