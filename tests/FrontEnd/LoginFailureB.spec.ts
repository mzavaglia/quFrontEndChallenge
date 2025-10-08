import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Login from '../../PO/login';

test('Login Failure B', async ({ page }) => {
  await page.goto(baseUrl+'login');

  // Leave fields empty and submit the form
  await page.locator(Login.userInputLocator).fill('');
  await page.locator(Login.passInputLocator).fill('');
  await page.locator(Login.submitBtnLocator).click();

  // An error message indicating fields cannot be empty should be displayed
  await expect(page.getByText("Fields can not be empty")).toBeVisible({ timeout: 5000 });
});