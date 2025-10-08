import { test, expect } from '@playwright/test';
import { baseUrl } from '../../PO/common';
import * as Search from '../../PO/search';

test('Search Success', async ({ page }) => {
  const term = 'test';

  await page.goto(baseUrl + 'search');

  const searchInput = page.locator(Search.searchInputLocator);
  const searchButton = page.locator(Search.searchButtonLocator);

  await expect(searchInput).toBeVisible();
  await searchInput.fill(term);
  await searchButton.click();
  await expect(page.getByText(term)).toBeVisible();
  
});