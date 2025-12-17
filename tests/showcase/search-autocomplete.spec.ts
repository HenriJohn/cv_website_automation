
import { test, expect } from '@playwright/test';
import { TestShowcasePage } from '../../page-objects/test-showcase.pom';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Test Showcase - Search with Autocomplete', { tag: '@showcase_stable' }, () => {
  let showcasePage: TestShowcasePage;

  test.beforeEach(async ({ page }) => {
    showcasePage = new TestShowcasePage(page);
    await showcasePage.goto();
  });

  test('verify search input is visible and functional', async () => {
    // Verify search input
    await expect(showcasePage.searchInput).toBeVisible();
    await expect(showcasePage.searchInput).toBeEnabled();

    // Verify placeholder text
    await expect(showcasePage.searchInput).toHaveAttribute('placeholder', 'Search test frameworks...');

    // Type in search
    await showcasePage.searchFramework('Playwright');

    // Verify input value
    const inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue('Playwright');
  });

  test('verify search with partial text', async () => {
    // Search for partial text
    await showcasePage.searchFramework('Play');

    // Wait for autocomplete
    await showcasePage.page.waitForTimeout(500);

    // Verify search input has value
    const inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue('Play');
  });

  test('verify search can be cleared', async () => {
    // Type in search
    await showcasePage.searchFramework('Cypress');
    
    // Verify input has value
    let inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue('Cypress');

    // Clear search
    await showcasePage.clearSearch();

    // Verify input is empty
    inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue('');
  });

  test('verify search with different frameworks', async () => {
    const frameworks = ['Selenium', 'Jest', 'Cypress', 'Playwright', 'TestNG'];

    for (const framework of frameworks) {
      // Search for framework
      await showcasePage.searchFramework(framework);
      await showcasePage.page.waitForTimeout(300);

      // Verify input value
      const inputValue = showcasePage.searchInput;
      await expect(inputValue).toHaveValue(framework);

      // Clear for next iteration
      await showcasePage.clearSearch();
      await showcasePage.page.waitForTimeout(200);
    }
  });

  test('verify search icon is visible', async () => {
    // Verify search icon
    await expect(showcasePage.searchIcon).toBeVisible();
  });

  test('verify search with special characters', async () => {
    // Test search with special characters
    const specialSearches = ['Test@', 'Frame#work', 'Auto-mation'];

    for (const search of specialSearches) {
      await showcasePage.searchFramework(search);
      await showcasePage.page.waitForTimeout(300);

      // Verify input accepts special characters
      const inputValue = showcasePage.searchInput;
      await expect(inputValue).toHaveValue(search);

      await showcasePage.clearSearch();
    }
  });

  test('verify search with numbers', async () => {
    // Search with numbers
    await showcasePage.searchFramework('123');
    
    // Verify input value
    const inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue('123');
  });

  test('verify search with long text', async () => {
    // Search with long text
    const longText = 'This is a very long search query to test the input field behavior';
    await showcasePage.searchFramework(longText);
    
    // Verify input accepts long text
    const inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue(longText);
  });

  test('verify search input focus', async () => {
    // Click on search input
    await showcasePage.searchInput.click();

    // Verify input is focused
    await expect(showcasePage.searchInput).toBeFocused();

    // Type without explicit fill
    await showcasePage.page.keyboard.type('Selenium');

    // Verify text was entered
    const inputValue = showcasePage.searchInput;
    await expect(inputValue).toHaveValue('Selenium');
  });
});
