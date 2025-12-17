
import { test, expect } from '@playwright/test';
import { TestShowcasePage } from '../../page-objects/test-showcase.pom';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Test Showcase - Dynamic Content Loading', { tag: '@showcase_stable' }, () => {
  let showcasePage: TestShowcasePage;

  test.beforeEach(async ({ page }) => {
    showcasePage = new TestShowcasePage(page);
    await showcasePage.goto();
  });

  test('verify dynamic content loads successfully', , async () => {
    // Verify button is visible and enabled
    await expect(showcasePage.loadDynamicContentButton).toBeVisible();
    await expect(showcasePage.loadDynamicContentButton).toBeEnabled();

    // Click the button
    await showcasePage.loadDynamicContentButton.click();

    // Verify loading state
    await expect(showcasePage.loadingSpinner).toBeVisible();
    await expect(showcasePage.loadDynamicContentButton).toBeDisabled();

    // Wait for content to load
    await expect(showcasePage.dynamicContentText).toBeVisible({ timeout: 5000 });

    // Verify content text
    await expect(showcasePage.dynamicContentText).toContainText('Dynamic content loaded successfully!');
    await expect(showcasePage.dynamicContentText).toContainText('This text appeared after 2 seconds');

    // Verify button is enabled again
    await expect(showcasePage.loadDynamicContentButton).toBeEnabled();
  });

  test('verify loading state displays correctly', , async () => {
    // Click the button
    await showcasePage.loadDynamicContentButton.click();

    // Verify loading spinner appears
    await expect(showcasePage.loadingSpinner).toBeVisible();

    // Verify button shows loading text
    await expect(showcasePage.loadDynamicContentButton).toContainText('Loading...');

    // Verify button is disabled during loading
    await expect(showcasePage.loadDynamicContentButton).toBeDisabled();
  });

  test('verify multiple dynamic content loads', , async () => {
    // Load content first time
    await showcasePage.loadDynamicContent();
    await expect(showcasePage.dynamicContentText).toBeVisible();

    // Click button again
    await showcasePage.loadDynamicContentButton.click();

    // Verify loading state appears again
    await expect(showcasePage.loadingSpinner).toBeVisible();

    // Verify content loads again
    await expect(showcasePage.dynamicContentText).toBeVisible({ timeout: 5000 });
  });
});
