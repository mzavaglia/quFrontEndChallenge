import { test, expect } from '@playwright/test';
import { baseUrl, invalidA } from '../../PO/common';
import * as Login from '../../PO/login';

test('Login Failure A', async ({ page }) => {
  await page.goto(baseUrl+'login');

  // Fill the login form with invalid credentials
  await page.locator(Login.userInputLocator).fill(invalidA.username);
  await page.locator(Login.passInputLocator).fill(invalidA.password);
  await page.locator(Login.submitBtnLocator).click();

  // An error message indicating wrong credentials should be displayed
  await expect(page.locator(Login.errorMessage)).toBeVisible();
  await expect(page.getByText("WRONG CREDENTIALS")).toBeVisible({ timeout: 5000 });
});