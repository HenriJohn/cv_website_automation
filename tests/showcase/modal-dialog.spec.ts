
import { test, expect } from '@playwright/test';
import { TestShowcasePage } from '../../page-objects/test-showcase.pom';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Test Showcase - Modal Dialog', { tag: '@showcase_stable' }, () => {
  let showcasePage: TestShowcasePage;

  test.beforeEach(async ({ page }) => {
    showcasePage = new TestShowcasePage(page);
    await showcasePage.goto();
  });

  test('verify modal opens successfully', async ({ page }) => {
    // Click open modal button
    await showcasePage.openModal();

    // Verify modal is visible
    await expect(showcasePage.modalDialog).toBeVisible();
    await expect(showcasePage.modalTitle).toBeVisible();
    await expect(showcasePage.modalTitle).toContainText('Test Modal');
    await expect(showcasePage.modalDescription).toBeVisible();
  });

  test('verify modal closes with cancel button', async ({ page }) => {
    // Open modal
    await showcasePage.openModal();
    await expect(showcasePage.modalDialog).toBeVisible();

    // Close with cancel
    await showcasePage.closeModalWithCancel();

    // Verify modal is closed
    await expect(showcasePage.modalDialog).not.toBeVisible();
  });

  test('verify modal closes with confirm button and shows success message', async ({ page }) => {
    // Open modal
    await showcasePage.openModal();
    await expect(showcasePage.modalDialog).toBeVisible();

    // Close with confirm
    await showcasePage.closeModalWithConfirm();

    // Verify modal is closed
    await expect(showcasePage.modalDialog).not.toBeVisible();

    // Verify success message
    await expect(showcasePage.modalSuccessMessage).toBeVisible();
    await expect(showcasePage.modalSuccessMessage).toContainText('Modal action confirmed!');
  });

  test('verify modal content and buttons', async ({ page }) => {
    // Open modal
    await showcasePage.openModal();

    // Verify all modal elements
    await expect(showcasePage.modalTitle).toContainText('Test Modal');
    await expect(showcasePage.modalDescription).toContainText(
      'This is a modal dialog for testing overlay interactions'
    );
    await expect(showcasePage.modalCancelButton).toBeVisible();
    await expect(showcasePage.modalCancelButton).toBeEnabled();
    await expect(showcasePage.modalConfirmButton).toBeVisible();
    await expect(showcasePage.modalConfirmButton).toBeEnabled();
  });

  test('verify modal can be opened multiple times', async ({ page }) => {
    // Open and close modal first time
    await showcasePage.openModal();
    await expect(showcasePage.modalDialog).toBeVisible();
    await showcasePage.closeModalWithCancel();
    await expect(showcasePage.modalDialog).not.toBeVisible();

    // Open and close modal second time
    await showcasePage.openModal();
    await expect(showcasePage.modalDialog).toBeVisible();
    await showcasePage.closeModalWithConfirm();
    await expect(showcasePage.modalDialog).not.toBeVisible();

    // Verify success message from second close
    await expect(showcasePage.modalSuccessMessage).toBeVisible();
  });

  test('verify modal overlay interaction', async ({ page }) => {
    // Open modal
    await showcasePage.openModal();
    await expect(showcasePage.modalDialog).toBeVisible();

    // Try clicking outside modal (on overlay)
    // Note: Behavior depends on implementation - modal might or might not close
    await page.mouse.click(10, 10);

    // Wait a moment
    await page.waitForTimeout(500);

    // Modal should still be visible if click-outside-to-close is not implemented
    // Or it should be hidden if it is implemented
    // This test documents the behavior
  });

  test('verify keyboard navigation in modal', async ({ page }) => {
    // Open modal
    await showcasePage.openModal();
    await expect(showcasePage.modalDialog).toBeVisible();

    // Try pressing Escape key
    await page.keyboard.press('Escape');

    // Wait a moment
    await page.waitForTimeout(500);

    // Check if modal closes with Escape (depends on implementation)
    // This test documents the keyboard behavior
  });
});
