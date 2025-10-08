import { test, expect } from '@playwright/test';
import { baseUrl, valid } from '../../PO/common';
import * as Login from '../../PO/login';


test('Login Success', async ({ page }) => {
  await page.goto(baseUrl+'login');

  // Fill the login form with valid credentials
  await page.locator(Login.userInputLocator).fill(valid.username);
  await page.locator(Login.passInputLocator).fill(valid.password);
  await page.locator(Login.submitBtnLocator).click();

  // User should be redirected to home page and see welcome message with username
  await expect(page.getByText("Welcome!")).toBeVisible();
  await expect(page.getByText(valid.username)).toBeVisible();
});