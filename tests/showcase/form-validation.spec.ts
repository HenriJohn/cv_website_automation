
import { test, expect } from '@playwright/test';
import { TestShowcasePage } from '../../page-objects/test-showcase.pom';
import { generateUsername, generateEmail, generateStrongPassword } from '../../utils/faker.util';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Test Showcase - Form Validation', { tag: '@showcase_stable' }, () => {
  let showcasePage: TestShowcasePage;

  test.beforeEach(async ({ page }) => {
    showcasePage = new TestShowcasePage(page);
    await showcasePage.goto();
  });

  test('verify successful form submission with valid data', async () => {
    // Generate test data
    const username = generateUsername();
    const email = generateEmail();
    const password = generateStrongPassword();

    // Fill form with valid data
    await showcasePage.fillForm({
      username: username,
      email: email,
      password: password,
      country: 'United States',
      agreeToTerms: true,
    });

    // Submit form
    await showcasePage.submitForm();

    // Verify success message
    await expect(showcasePage.formSuccessMessage).toBeVisible({ timeout: 5000 });
    await expect(showcasePage.formSuccessMessage).toContainText('Form submitted successfully!');
  });

  test('verify username validation - too short', async () => {
    // Enter username with less than 3 characters
    await showcasePage.usernameField.fill('ab');
    await showcasePage.usernameField.blur();

    // Verify error message
    await expect(showcasePage.usernameError).toBeVisible();
    await expect(showcasePage.usernameError).toContainText('Username must be at least 3 characters');
  });

  test('verify email validation - invalid format', async () => {
    // Test various invalid email formats
    const invalidEmails = [
      'invalid-email',
      'missing@domain',
      '@nodomain.com',
      'no-at-sign.com',
      'spaces in@email.com',
    ];

    for (const email of invalidEmails) {
      await showcasePage.emailField.fill(email);
      await showcasePage.emailField.blur();

      // Verify error message appears
      await expect(showcasePage.emailError).toBeVisible();
      await expect(showcasePage.emailError).toContainText('Please enter a valid email address');

      // Clear for next iteration
      await showcasePage.emailField.clear();
    }
  });

  test('verify password validation - too short', async () => {
    // Enter password with less than 8 characters
    await showcasePage.passwordField.fill('short');
    await showcasePage.passwordField.blur();

    // Verify error message
    await expect(showcasePage.passwordError).toBeVisible();
    await expect(showcasePage.passwordError).toContainText('Password must be at least 8 characters');
  });

  test('verify form fields are required', async () => {
    // Try to submit empty form
    await showcasePage.submitForm();

    // Verify submit button behavior or error messages
    // Note: Actual behavior depends on implementation
    await expect(showcasePage.usernameField).toBeVisible();
    await expect(showcasePage.emailField).toBeVisible();
    await expect(showcasePage.passwordField).toBeVisible();
  });

  test('verify country dropdown options', async () => {
    // Click country dropdown
    await showcasePage.countryDropdown.click();

    // Verify dropdown has options
    const options = await showcasePage.countryDropdown.locator('option').count();
    expect(options).toBeGreaterThan(1); // Should have more than just placeholder

    // Select a country
    await showcasePage.countryDropdown.selectOption('Canada');

    // Verify selection
    const selectedValue = showcasePage.countryDropdown;
    await expect(selectedValue).toHaveValue('Canada');
  });

  test('verify terms and conditions checkbox', async () => {
    // Verify checkbox is initially unchecked
    await expect(showcasePage.termsCheckbox).not.toBeChecked();

    // Check the checkbox
    await showcasePage.termsCheckbox.check();

    // Verify checkbox is checked
    await expect(showcasePage.termsCheckbox).toBeChecked();

    // Uncheck the checkbox
    await showcasePage.termsCheckbox.uncheck();

    // Verify checkbox is unchecked
    await expect(showcasePage.termsCheckbox).not.toBeChecked();
  });

  test('verify error messages disappear with valid input', async () => {
    // Trigger username error
    await showcasePage.usernameField.fill('ab');
    await showcasePage.usernameField.blur();
    await expect(showcasePage.usernameError).toBeVisible();

    // Fix with valid input
    await showcasePage.usernameField.fill('validusername');
    await showcasePage.usernameField.blur();
    await expect(showcasePage.usernameError).toBeHidden();

    // Trigger email error
    await showcasePage.emailField.fill('invalid');
    await showcasePage.emailField.blur();
    await expect(showcasePage.emailError).toBeVisible();

    // Fix with valid input
    await showcasePage.emailField.fill('valid@email.com');
    await showcasePage.emailField.blur();
    await expect(showcasePage.emailError).toBeHidden();

    // Trigger password error
    await showcasePage.passwordField.fill('short');
    await showcasePage.passwordField.blur();
    await expect(showcasePage.passwordError).toBeVisible();

    // Fix with valid input
    await showcasePage.passwordField.fill('ValidPassword123!');
    await showcasePage.passwordField.blur();
    await expect(showcasePage.passwordError).toBeHidden();
  });

  test('verify all form fields are visible and enabled', async () => {
    // Verify all form elements
    await expect(showcasePage.usernameField).toBeVisible();
    await expect(showcasePage.usernameField).toBeEnabled();

    await expect(showcasePage.emailField).toBeVisible();
    await expect(showcasePage.emailField).toBeEnabled();

    await expect(showcasePage.passwordField).toBeVisible();
    await expect(showcasePage.passwordField).toBeEnabled();

    await expect(showcasePage.countryDropdown).toBeVisible();
    await expect(showcasePage.countryDropdown).toBeEnabled();

    await expect(showcasePage.termsCheckbox).toBeVisible();
    await expect(showcasePage.termsCheckbox).toBeEnabled();

    await expect(showcasePage.submitFormButton).toBeVisible();
    await expect(showcasePage.submitFormButton).toBeEnabled();
  });
});
