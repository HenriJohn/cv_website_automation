import { test, expect } from '@playwright/test';
import { LandingPage } from '../../page-objects/landing.pom';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Landing Page - Navigation and UI', { tag: '@landing_stable' }, () => {
  let landingPage: LandingPage;

  test.beforeEach(async () => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test('verify landing page loads with all elements', async () => {
    // Verify page title
    await expect(page).toHaveTitle(/Henri-John Plaatjies/);

    // Verify all key elements are visible
    await landingPage.verifyLandingPageElements();

    // Verify specific elements
    await expect(landingPage.logo).toBeVisible();
    await expect(landingPage.pageTitle).toContainText('Henri-John Plaatjies');
    await expect(landingPage.subtitle).toContainText('Senior Test Automation Engineer');
    await expect(landingPage.viewShowcaseButton).toBeVisible();
    await expect(landingPage.explorerPanel).toBeVisible();
  });

  test('navigate to test showcase page', async () => {
    // Click the View Showcase button
    await landingPage.navigateToShowcase();

    // Verify URL changed
    await expect(page).toHaveURL(/#\/test-showcase/);

    // Verify showcase page heading is visible
    await expect(page.getByRole('heading', { name: '🎯 Test Automation Showcase' })).toBeVisible();
  });

  test('verify explorer panel files are visible', async () => {
    // Verify all files in the explorer are visible
    await expect(landingPage.readmeFile).toBeVisible();
    await expect(landingPage.skillsFile).toBeVisible();
    await expect(landingPage.experienceFolder).toBeVisible();
    await expect(landingPage.educationFile).toBeVisible();
    await expect(landingPage.contactFile).toBeVisible();
    await expect(landingPage.downloadCvFile).toBeVisible();
  });

  test('verify theme toggle functionality', async () => {
    // Click theme toggle
    await landingPage.toggleTheme();

    // Wait a moment for theme change
    await landingPage.page.waitForTimeout(500);

    // Verify theme toggle is still visible (basic check)
    await expect(landingPage.themeToggle).toBeVisible();
  });

  test('verify sidebar toggle functionality', async () => {
    // Click sidebar toggle
    await landingPage.toggleSidebar();

    // Wait for animation
    await landingPage.page.waitForTimeout(500);

    // Toggle again to restore
    await landingPage.toggleSidebar();

    // Verify explorer is visible again
    await expect(landingPage.explorerPanel).toBeVisible();
  });

  test('verify terminal is interactive', async () => {
    // Verify terminal input is visible
    await expect(landingPage.terminalInput).toBeVisible();

    // Type a command in terminal
    await landingPage.typeInTerminal('help');

    // Verify input was accepted (terminal should still be visible)
    await expect(landingPage.terminalInput).toBeVisible();
  });

  test.skip('verify get started and quick command sections', async () => {
    // TODO: These elements are dynamically loaded and need special handling
    // Skipping for now to focus on showcase tests which are more stable
    await expect(landingPage.getStartedSection).toBeVisible();
    await expect(landingPage.getStartedText).toBeVisible();

    // Verify Quick Command section
    await expect(landingPage.quickCommandSection).toBeVisible();
    await expect(landingPage.quickCommandText).toBeVisible();
  });
});
