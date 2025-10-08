import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Checkout from '../../PO/checkout';
import { randomInt } from 'crypto';

test('Checkout Form Alert', async ({ page }) => {
  await page.goto(baseUrl + 'checkout');

  // Fill Billing Address
  await page.locator(Checkout.fullName).fill('John Doe');
  await page.locator(Checkout.emailInput).fill('john.doe@example.com');
  await page.locator(Checkout.addressInput).fill('123 Main St');
  await page.locator(Checkout.cityInput).fill('Metropolis');
  await page.locator(Checkout.stateInput).fill('CA');
  await page.locator(Checkout.zipInput).fill('12345');

  // Fill Payment
  await page.locator(Checkout.cardNameInput).fill('John Doe');
  await page.locator(Checkout.cardNumberInput).fill('4111111111111111');
  await page.locator(Checkout.expiryInput).selectOption({ index: randomInt(1,12) });
  await page.locator(Checkout.expireYearInput).fill('2025');
  await page.locator(Checkout.cvvInput).fill('123');

  // If "Same as billing" checkbox exists and is checked, uncheck it
  const sameAsBilling = page.locator(Checkout.sameAsBillingCheckbox);
  if (await sameAsBilling.count() > 0) {
    if (await sameAsBilling.isChecked()) {
      await sameAsBilling.uncheck();
    }
  }

  // Submit and wait for browser dialog (alert/confirm), validate and accept it
  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    page.locator(Checkout.submitOrderButton).click()
  ]);
  // Validate alert message is shown (not empty) and accept it
  expect(dialog.message()).toBeTruthy();
  await dialog.accept();

  // Assert any in-page alert/notification is gone (if present)
  const inPageAlert = page.locator('[role="alert"], .error, .alert, .notification');
  if (await inPageAlert.count() > 0) {
    await expect(inPageAlert).toBeHidden({ timeout: 2000 });
  }
});