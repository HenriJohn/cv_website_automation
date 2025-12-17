---
trigger: always_on
---

# Test File Rules

## File Structure and Naming

- **File naming**: Use `.spec.ts` suffix for all test files
- **Directory structure**: Organize tests by user role and feature (e.g., `teacher/auth/`, `teacher/navigation/`, `learner/`)
- **Test suite naming**: Use descriptive names that match the feature being tested

## Import Standards

```typescript
import { qase } from 'playwright-qase-reporter/playwright';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/auth/authentication.pom';
import { highlight } from '../../../utils/highlight.util';
import dotenv from 'dotenv';

dotenv.config();
```

## Test Suite Structure

### Test Describe Block

```typescript
test.describe('Feature Name - Specific Area', { tag: '@feature_stable' }, () => {
  // Test implementation
});
```

### Required Elements

- Use `test.describe()` with descriptive name and stability tag
- Include page object instances as variables
- Use `test.beforeEach()` for common setup
- Use Qase integration with `qase()` function for test case IDs

## Test Organization Patterns

### Variable Declaration

```typescript
let loginPage: LoginPage;
let signupPage: SignUpPage;
let navSection: ApplicationNav;
```

### BeforeEach Setup

```typescript
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  signupPage = new SignUpPage(page);

  await page.goto('/v2/teken-in');
  // Additional setup as needed
});
```

## Test Case Structure

### Basic Test Pattern

```typescript
test(qase(1, 'descriptive test name'), async ({ page }) => {
  // Arrange
  // Act
  // Assert
});
```

### Multiple Test Cases Pattern

```typescript
test(qase([44, 45], 'test covering multiple cases'), async ({ page }) => {
  // Implementation
});
```

## Assertion Patterns

### URL Assertions

```typescript
await expect(page).toHaveURL(/tuis/);
await expect(page).toHaveURL('https://staging-ws-client.wolkskool.co.za/inhoud');
await expect(page).toHaveURL(/sluit-aan\/verifikasie\?token=/, {
  timeout: 5000,
});
```

### Element Visibility and State

```typescript
await expect(loginPage.errorMessageToast).toBeVisible();
await expect(loginPage.loginButton).toBeDisabled();
await expect(signupPage.formsErrorMsg).not.toBeVisible();
await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
```

### Text Content Assertions

```typescript
await expect(loginPage.errorMessageToast).toHaveText('Expected Text');
await expect(navSection.home).toContainText('Tuis');
```

### Form Field Assertions

```typescript
await expect(loginPage.emailField).toBeEmpty();
await expect(signupPage.termsAndConditions).toBeChecked();
```

## Data-Driven Testing

### Array-Based Testing

```typescript
const invalidEmails = ['plainaddress', '@missingusername.com', 'username@.com'];

for (const email of invalidEmails) {
  await signupPage.emailField.fill(email);
  await signupPage.emailField.blur();
  await expect(signupPage.formsErrorMsg).toBeVisible();
  await signupPage.clearAndBlur(signupPage.emailField);
}
```

### Dynamic Data Generation

```typescript
const randomDigits = randomSequenceOfNumbers(4);
const userEmail = `tebogo.tema+new_user+${randomDigits}@test.com`;

await signupPage.signupTeacher({
  email: userEmail,
  name: fakeName(),
  lastName: fakeLastName(),
  password: userPassword,
});
```

## Environment Variables Usage

- Use non-null assertion for required environment variables: `process.env.TEACHER_EMAIL!`
- Include `dotenv.config()` when using environment variables
- Store sensitive data like credentials in environment variables

## Test Tags and Organization

### Stability Tags

- `@login_stable` - For stable login tests
- `@signup_stable` - For stable signup tests
- `@navigation_stable` - For stable navigation tests
- `@onboarding_step_1_stable` - For stable onboarding tests
- `@email_verification_stable` - For stable email verification tests

## Advanced Testing Patterns

### Popup Window Handling

```typescript
const [helpPage] = await Promise.all([page.waitForEvent('popup'), navSection.help.click()]);

await expect(helpPage).toHaveURL('https://www.wolkskool.co.za/kontak');
await helpPage.close();
```

### Email Testing Integration

```typescript
const sentEmail = await mailosaurUtil.getEmail(serverId, userData.email);
expect(sentEmail).toBeDefined();
expect(sentEmail.to && sentEmail.to[0].email).toBe(userData.email);
```

### JWT Token Validation

```typescript
const decoded = jwtDecode(token!);
const nowUtcMillis = Date.now();
const expMillis = (decoded.exp ?? 0) * 1000;
expect(expMillis).toBeGreaterThan(nowUtcMillis);
```

## Visual Testing Integration

### Highlight Utility Usage

```typescript
await highlight(page, navSection.home, {
  borderType: 'solid',
  color: 'red',
});

await highlight(page, onboardingPage.idNumberField1, {
  color: 'red',
  borderType: 'dashed',
});
```

## Error Handling and Edge Cases

### Try-Catch for Expected Failures

```typescript
let errorCaught = false;
try {
  await mailosaurUtil.getEmail(serverId, userData.email);
} catch (error: any) {
  errorCaught = true;
  expect(error.message).toContain('No matching messages found');
}
expect(errorCaught).toBe(true);
```

## Test Skipping and TODOs

### Skip Tests with Business Context

```typescript
test.skip(qase(27, 'handle empty fields'), async ({ page }) => {
  // TODO: - The button isn't disabled at all. Upon clicking, we get no errors
});
```

## Authentication and Setup Patterns

### Login Before Tests

```typescript
test.beforeEach(async ({ page }) => {
  await loginPage.goto();
  await loginPage.login(process.env.TEACHER_EMAIL!, process.env.TEACHER_PASSWORD!);
  await expect(page).toHaveURL(/tuis/);
});
```

### Complex Setup with Email Verification

```typescript
if (!token) {
  await page.goto('/v2/sluit-aan');
  signupPage.signupTeacher(userData);
  await signupPage.createAccountButton.click();

  const sentEmail = await mailosaurUtil.getEmail(serverId, userData.email);
  const buttonUrl = sentEmail.html?.body?.match(/href="([^"]+)"/)?.[1];
  token = buttonUrl?.split('token=')[1] || '';
}
```

## Best Practices

- Use descriptive test names that explain the expected behavior
- Include business context in comments and TODOs
- Group related assertions together
- Use timeouts for operations that may take longer
- Clear form fields between iterations in loops
- Use proper async/await patterns
- Include both positive and negative test cases
- Test edge cases and boundary conditions
- Use meaningful variable names for test data
- Organize tests from simple to complex scenarios
