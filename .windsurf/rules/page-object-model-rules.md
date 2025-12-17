---
trigger: always_on
---

# Page Object Model (POM) Rules

## File Structure and Naming

- **File naming**: Use `.pom.ts` suffix for all Page Object Model files
- **Directory structure**: Organize POM files by feature/domain (e.g., `auth/`, `navigation/`)
- **Class naming**: Use descriptive names ending with "Page" (e.g., `LoginPage`, `SignUpPage`, `OnboardingPage`, `ApplicationNav`)

## Import Standards

```typescript
import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
```

## Class Structure

### Required Properties

- `readonly page: Page` - Always the first property
- All locators should be `readonly` and typed as `Locator`
- Use descriptive names for locators that clearly indicate their purpose

### Constructor Pattern

```typescript
constructor(page: Page) {
    this.page = page;
    // Initialize all locators here
}
```

## Locator Selection Strategy

### Preferred Locator Methods (in order of preference)

1. **Test ID selectors**: `page.getByTestId('test-id')`
2. **Role-based selectors**: `page.getByRole('button', { name: 'Button Text' })`
3. **Text-based selectors**: `page.getByText('Exact Text')`
4. **Placeholder selectors**: `page.getByPlaceholder('Placeholder Text')`
5. **XPath selectors**: Only when other methods are not feasible

### Locator Examples

```typescript
// Good - Role-based
this.loginButton = page.getByRole('button', { name: 'Teken In' });
this.emailField = page.getByRole('textbox', { name: 'Voer jou e-pos adres' });

// Good - Test ID
this.passwordToggleButton = page.getByTestId('view-on-off-icon').getByRole('img');

// Acceptable - XPath when necessary
this.invalidIdField = page.locator("//p[contains(text(),'Ongeldige Suid-Afrikaanse ID-nommer')]");
```

## Method Patterns

### Navigation Methods

- Use `async goto()` for page navigation
- Include environment variables for URLs: `${process.env.URL_STAGING!}/path`

### Action Methods

- Use descriptive method names that indicate the action (e.g., `login()`, `signupTeacher()`, `fillCorrectNationalId()`)
- Make methods `async` and return `Promise<void>` unless returning specific data
- Use parameter objects for methods with multiple optional parameters

### Parameter Handling

```typescript
// Good - Default parameters with destructuring
async signupTeacher({
    name = 'Automation',
    lastName = 'Tester',
    email = 'automation+test@example.com',
    password = 'Welcomeback@1'
}: {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
} = {}): Promise<void> {
    // Implementation
}

// Good - Required parameters
async login(email: string, password: string): Promise<void> {
    // Implementation
}
```

## Action Patterns

### Form Interactions

- Use `.fill()` for text inputs
- Use `.click()` for buttons and checkboxes
- Use `.blur()` after filling fields when validation is needed
- Chain actions logically: fill → blur → next field

### Wait Strategies

- Rely on Playwright's auto-waiting capabilities
- Use explicit waits only when necessary
- Avoid hard-coded delays

## Error Handling and Validation

- Include locators for error messages and validation states
- Use descriptive names for error-related locators (e.g., `errorMessageToast`, `formsErrorMsg`)

## Utility Methods

- Include helper methods for common actions (e.g., `clearAndBlur()`)
- Keep utility methods within the same class when specific to that page
- Extract to separate utility files when used across multiple POMs

## Export Pattern

```typescript
export { LoginPage, SignUpPage }; // Named exports
// OR
export class OnboardingPage {} // Direct export
```

## Environment Configuration

- Always include `dotenv.config()` at the top of files using environment variables
- Use non-null assertion (`!`) for required environment variables: `process.env.URL_STAGING!`

## Code Organization

- Group related locators together (e.g., all form fields, all navigation elements)
- Order locators logically (top to bottom, left to right on the page)
- Place constructor after property declarations
- Place navigation methods first, followed by action methods, then utility methods

## Naming Conventions

- Use camelCase for all properties and methods
- Use descriptive names that reflect the UI element's purpose
- Avoid abbreviations unless they're widely understood
- Include element type in locator names when helpful (e.g., `Button`, `Field`, `Url`)

## Best Practices

- One class per logical page or component
- Keep methods focused on single responsibilities
- Use TypeScript types for better IDE support and error catching
- Make locators as stable as possible by preferring semantic selectors
- Document complex locator strategies with comments when necessary
