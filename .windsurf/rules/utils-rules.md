---
trigger: always_on
---

# Utils Rules

## When to Create Utils

**Create a utility function when:**

- A method will be used in **3 or more places** across the codebase
- Complex logic needs to be reused across multiple test files or page objects
- Business logic requires centralized implementation for consistency
- External service integrations need standardized interfaces
- Data generation or manipulation patterns are repeated

## File Structure and Naming

- **File naming**: Use `.util.ts` suffix for all utility files
- **Directory**: Place all utils in `src/utils/` directory
- **Naming convention**: Use descriptive names that indicate the utility's purpose (e.g., `faker.util.ts`, `highlight.util.ts`, `mailosaur.util.ts`)

## Import Standards

```typescript
import { Page, Locator } from '@playwright/test';
import externalLibrary from 'external-library';
```

## Function Documentation

### Required JSDoc Comments

- All utility functions must include comprehensive JSDoc comments
- Include `@param` for all parameters with types and descriptions
- Include `@returns` with return type and description
- Include `@throws` for functions that can throw errors
- Include `@example` for complex functions

### Documentation Example

```typescript
/**
 * Highlights a DOM element on the page by applying a colored border for a short duration.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {string | Locator} elementLocator - The selector string or Playwright Locator for the element to highlight.
 * @param {HighlightOptions} [options] - Options for customizing the border style.
 * @param {'solid' | 'dotted' | 'dashed'} [options.borderType='solid'] - The type of border to apply.
 * @param {string} [options.color='blue'] - The color of the border.
 * @throws {Error} If the element is not found.
 * @returns {Promise<void>} Resolves after highlighting is complete.
 */
```

## Utility Categories and Patterns

### Data Generation Utils (`faker.util.ts`)

- Use `@faker-js/faker` for generating test data
- Create domain-specific generators (e.g., `fakeSouthAfricanIdNumber()`)
- Include validation logic for complex data formats
- Use descriptive function names that indicate the data type

```typescript
export function fakeName() {
  return faker.person.firstName();
}

export function fakeSouthAfricanIdNumber() {
  // Complex implementation with validation
}
```

### Visual Testing Utils (`highlight.util.ts`)

- Create functions for debugging and visual verification
- Use TypeScript interfaces for options objects
- Provide sensible defaults for optional parameters
- Handle both string selectors and Locator objects

```typescript
type HighlightOptions = {
  borderType: 'solid' | 'dotted' | 'dashed';
  color: string;
};

export async function highlight(
  page: Page,
  elementLocator: string | Locator,
  options: HighlightOptions = { borderType: 'solid', color: 'blue' }
) {
  // Implementation
}
```

### External Service Utils (`mailosaur.util.ts`)

- Create class-based utilities for external service integrations
- Use constructor injection for configuration
- Provide methods for common operations
- Handle errors gracefully with meaningful error messages

```typescript
export class MailosaurUtil {
  private client: MailosaurClient;

  constructor(apiKey: string = process.env.MAILOSAUR_API_KEY as string) {
    this.client = new MailosaurClient(apiKey);
  }

  async getEmail(serverId: string, emailAddress: string, options: any = {}) {
    // Implementation
  }
}
```

### Browser Interaction Utils (`getUserIdFromSession.util.ts`)

- Create functions for browser-specific operations
- Use `page.evaluate()` for client-side operations
- Handle JSON parsing and potential errors
- Return null for missing or invalid data

```typescript
export async function getUserIdFromSession(
  page: Page,
  USER_STORAGE_KEY: string
): Promise<string | null> {
  const userId = await page.evaluate((key) => {
    // Client-side logic
  }, USER_STORAGE_KEY);

  return userId;
}
```

### Token/Authentication Utils (`jwt.util.ts`)

- Create functions for token generation and validation
- Use proper TypeScript types for parameters
- Provide sensible defaults for options
- Handle security-related operations

```typescript
export function generateJwtToken(
  payload: Record<string, unknown>,
  secret: string,
  options: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '2h' }
): string {
  return jwt.sign(payload, secret, options);
}
```

### File System Utils (`read-files.util.ts`)

- Create functions for file operations
- Handle errors with try-catch blocks
- Log errors for debugging
- Use proper error handling patterns

```typescript
function readJSONFile(filePath: string): any {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    throw err;
  }
}
```

## Export Patterns

### Named Exports (Preferred)

```typescript
export { readJSONFile };
export function fakeName() {}
export async function highlight() {}
```

### Class Exports

```typescript
export class MailosaurUtil {
  // Implementation
}
```

## Error Handling Standards

- Use try-catch blocks for operations that can fail
- Throw meaningful error messages
- Log errors for debugging purposes
- Return null or default values for non-critical failures
- Use proper TypeScript error types

## TypeScript Standards

- Use proper type annotations for all parameters and return values
- Create interfaces/types for complex objects
- Use union types for limited options (e.g., `'solid' | 'dotted' | 'dashed'`)
- Use optional parameters with default values
- Use generic types when appropriate

## Environment Variable Handling

- Use environment variables for configuration
- Provide defaults when possible
- Use non-null assertion (`!`) only when variable is guaranteed to exist
- Handle missing environment variables gracefully

## Testing Considerations

- Make utils easily testable by avoiding side effects
- Use dependency injection for external dependencies
- Create pure functions when possible
- Handle edge cases and boundary conditions

## Performance Guidelines

- Avoid creating unnecessary objects in loops
- Cache expensive operations when appropriate
- Use async/await for asynchronous operations
- Consider memory usage for large data operations

## Reusability Principles

- Keep functions focused on single responsibilities
- Avoid tight coupling to specific test scenarios
- Make functions configurable through parameters
- Use composition over inheritance for complex utilities

## Best Practices

- **DRY Principle**: Extract common logic into utils when used 3+ times
- **Single Responsibility**: Each utility should have one clear purpose
- **Consistent Naming**: Use descriptive names that indicate functionality
- **Proper Documentation**: Include comprehensive JSDoc comments
- **Error Handling**: Handle errors gracefully with meaningful messages
- **Type Safety**: Use TypeScript features for better code quality
- **Testability**: Design utils to be easily testable
- **Configuration**: Use parameters and environment variables for flexibility

## Migration Strategy

When converting repeated code to utils:

1. Identify patterns used in 3+ locations
2. Extract the common logic into a utility function
3. Add proper TypeScript types and JSDoc documentation
4. Update all usage locations to use the new utility
5. Test the utility thoroughly with edge cases
6. Remove the duplicated code from original locations
