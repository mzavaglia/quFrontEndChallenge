import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Search from '../../PO/search';

test('Search Empty', async ({ page }) => {
  await page.goto(baseUrl + 'search');

  const searchInput = page.locator(Search.searchInputLocator);
  const searchButton = page.locator(Search.searchButtonLocator);

  await expect(searchInput).toBeVisible();

  // Leave input empty and submit
  await searchInput.fill('');
  await searchButton.click();

  // Assert validation message is shown
  await expect(page.getByText('Please provide a search word.')).toBeVisible();
});