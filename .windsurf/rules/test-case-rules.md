---
trigger: always_on
---

# Test Case JSON Rules and Standards

This document defines the rules and standards for creating test case JSON files in the QA SSO Automation project.

## File Structure and Naming

### File Naming Convention

- Use kebab-case for file names
- Include a sequential number prefix: `{number}-{descriptive-name}.json`
- Examples: `1-success-login.json`, `2-incorrect-password.json`

### Directory Structure

- Organize test cases by feature/module in the `test-cases/` directory
- Use nested directories for complex features (e.g., `register/onboarding/step-2/`)

## Required JSON Schema

Every test case JSON file MUST contain the following fields:

```json
{
    "title": "string",
    "description": "string",
    "preconditions": "string",
    "severity": integer,
    "priority": integer,
    "status": integer,
    "behavior": integer,
    "type": integer,
    "layer": integer,
    "is_flaky": integer,
    "automation": integer,
    "suite_id": integer,
    "steps": array
}
```

## Field Definitions and Rules

### Basic Information Fields

#### `title` (string, required)

- Concise, descriptive title of the test case
- Use title case
- Should clearly indicate what is being tested
- Examples: "Successful Sign In", "Select Province", "Menu Collapse and Expand"

#### `description` (string, required)

- Detailed explanation of what the test verifies
- Start with "Verify that..." or "Verify the..."
- Be specific about the expected behavior
- Examples: "Verify that users can sign in with valid credentials."

#### `preconditions` (string, required)

- State what must be true before executing the test
- Use present tense
- Be specific about user state, data requirements, or system state
- Examples: "User is logged in and the side menu is visible."

### Enumerated Fields

All enumerated fields use integer values as defined below:

#### `severity` (integer, required)

- `0` = undefined/not set
- `1` = trivial
- `2` = minor
- `3` = normal
- `4` = major
- `5` = critical
- `6` = blocker

#### `priority` (integer, required)

- `0` = undefined/not set
- `1` = low
- `2` = medium
- `3` = high

#### `status` (integer, required)

- `0` = draft
- `1` = actual/active
- `2` = deprecated

#### `behavior` (integer, required)

- `0` = undefined/not set
- `1` = positive (happy path)
- `2` = negative (error scenarios)
- `3` = destructive

#### `type` (integer, required)

- Use appropriate integer value based on test type
- Common values: `1` for functional tests, `2` for integration tests

#### `layer` (integer, required)

- `0` = unknown/not set
- `1` = e2e (end-to-end)
- `2` = api
- `3` = unit

#### `is_flaky` (integer, required)

- `0` = no (stable test)
- `1` = yes (flaky test)

#### `automation` (integer, required)

- `0` = is-not-automated/manual
- `1` = to-be-automated
- `2` = automated

#### `suite_id` (integer, required)

- Unique identifier for the test suite this case belongs to
- Group related test cases with the same suite_id
- Examples: Login tests = 2, Navigation tests = 15, Onboarding Step 2 = 20

### Steps Array

#### `steps` (array, required)

- Array of step objects defining the test execution
- Each step must contain `action` and `expected_result`
- Optional `data` field for test data

#### Step Object Structure

```json
{
  "action": "string (required)",
  "expected_result": "string (required)",
  "data": "string (optional)"
}
```

#### Step Guidelines

- **action**: Describe the user action in imperative form
  - Start with action verbs: "Click", "Enter", "Navigate", "Select"
  - Be specific about UI elements: "Click the 'Teken In' button"
  - Include field names in quotes when applicable
- **expected_result**: Describe what should happen after the action
  - Use present tense: "The user is signed in"
  - Be specific about expected outcomes
  - Include error messages for negative tests
- **data**: Include test data when needed
  - Use realistic but safe test data
  - For sensitive data, use placeholder values
  - Examples: "tebogo.tema@scrums.com", "Password12345"

## Common Patterns

### Positive Test Cases

- `behavior`: 1
- `severity`: 3 or 4 (normal to major)
- `priority`: 3 (high)
- Focus on successful user journeys

### Negative Test Cases

- `behavior`: 2
- Test error handling and validation
- Include expected error messages in `expected_result`

### Navigation Test Cases

- `suite_id`: 15
- `layer`: 1 (e2e)
- Focus on UI interactions and menu functionality

### Authentication Test Cases

- `suite_id`: 2
- Include both positive and negative scenarios
- Use consistent test data format

## Quality Guidelines

### Consistency

- Use consistent language and terminology
- Follow the same sentence structure patterns
- Maintain consistent formatting

### Clarity

- Write clear, unambiguous steps
- Avoid technical jargon in user-facing descriptions
- Be specific about UI elements and expected outcomes

### Maintainability

- Keep test cases atomic (test one thing)
- Make steps independent where possible
- Use descriptive titles and descriptions

## Example Template

```json
{
  "title": "Test Case Title",
  "description": "Verify that [specific behavior or functionality].",
  "preconditions": "State of system/user before test execution.",
  "severity": 3,
  "priority": 1,
  "status": 1,
  "behavior": 1,
  "type": 1,
  "layer": 1,
  "is_flaky": 0,
  "automation": 0,
  "suite_id": 1,
  "steps": [
    {
      "action": "Describe the user action",
      "expected_result": "Describe the expected outcome"
    },
    {
      "action": "Next action with test data",
      "expected_result": "Expected result",
      "data": "test-data-value"
    }
  ]
}
```

## Validation Checklist

Before creating a test case, ensure:

- [ ] All required fields are present
- [ ] Enumerated fields use correct integer values
- [ ] Title is descriptive and follows naming convention
- [ ] Description starts with "Verify that..." or "Verify the..."
- [ ] Preconditions are clearly stated
- [ ] Steps are clear and actionable
- [ ] Expected results are specific and measurable
- [ ] Suite ID is appropriate for the test category
- [ ] JSON is properly formatted and valid
