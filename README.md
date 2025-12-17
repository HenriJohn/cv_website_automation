# 🎯 Henri-John Plaatjies CV Website - Test Automation Framework

A comprehensive Playwright automation framework built with TypeScript for testing the Henri-John Plaatjies CV website. This framework follows industry best practices including the Page Object Model (POM) pattern, proper test organization, and integrated quality gates.

## 🌐 Website Under Test

- **Landing Page**: https://henrijohn.github.io/cv_website/
- **Test Showcase**: https://henrijohn.github.io/cv_website/#/test-showcase

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Page Object Model](#page-object-model)
- [Utilities](#utilities)
- [Git Hooks](#git-hooks)
- [CI/CD Integration](#cicd-integration)
- [Reporting](#reporting)
- [Best Practices](#best-practices)

## ✨ Features

- ✅ **Page Object Model (POM)** - Clean separation of test logic and page interactions
- ✅ **TypeScript** - Type-safe test automation
- ✅ **Playwright** - Modern, fast, and reliable browser automation
- ✅ **Multi-browser Support** - Chrome, Firefox, Safari, and mobile viewports
- ✅ **Qase Integration** - Test management and reporting
- ✅ **Faker.js** - Dynamic test data generation
- ✅ **Husky + Lint-staged** - Pre-commit hooks for code quality
- ✅ **ESLint + Prettier** - Code linting and formatting
- ✅ **Comprehensive Test Cases** - JSON-based test case documentation
- ✅ **Utility Functions** - Reusable helper functions
- ✅ **Yarn Package Manager** - Fast, reliable dependency management

## 🛠 Tech Stack

- **Test Framework**: Playwright v1.48.0
- **Language**: TypeScript v5.6.0
- **Package Manager**: Yarn v4.0.2
- **Test Runner**: Playwright Test Runner
- **Data Generation**: Faker.js v9.0.0
- **Test Management**: Qase Reporter v2.0.0
- **Code Quality**: ESLint v8.57.0, Prettier v3.2.5
- **Git Hooks**: Husky v9.0.11, Lint-staged v15.2.0

## 📁 Project Structure

```
hjp_automation/
├── .husky/                      # Git hooks configuration
├── .yarn/                       # Yarn package manager files
├── page-objects/                # Page Object Model files
│   ├── landing.pom.ts          # Landing page POM
│   └── test-showcase.pom.ts    # Test showcase page POM
├── tests/                       # Test specification files
│   ├── landing/                # Landing page tests
│   │   └── landing-page.spec.ts
│   └── showcase/               # Showcase page tests
│       ├── dynamic-content.spec.ts
│       ├── state-management.spec.ts
│       ├── form-validation.spec.ts
│       ├── modal-dialog.spec.ts
│       ├── data-table.spec.ts
│       └── search-autocomplete.spec.ts
├── test-cases/                  # JSON test case documentation
│   ├── landing/                # Landing page test cases
│   └── showcase/               # Showcase page test cases
├── utils/                       # Utility functions
│   ├── faker.util.ts           # Data generation utilities
│   └── wait.util.ts            # Wait and timing utilities
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
├── .eslintrc.json              # ESLint configuration
├── .prettierrc.json            # Prettier configuration
├── .yarnrc.yml                 # Yarn configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 📦 Prerequisites

- **Node.js**: v18.x or higher
- **Yarn**: v4.x (will be installed automatically)
- **Git**: For version control and hooks

## 🚀 Installation

**Quick Install (4 commands):**

```bash
corepack enable
yarn install
yarn playwright install --with-deps
git init && yarn prepare
```

**Detailed Steps:**

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd hjp_automation
   ```

2. **Enable Corepack** (for Yarn):

   ```bash
   corepack enable
   ```

3. **Install dependencies**:

   ```bash
   yarn install
   ```

4. **Install Playwright browsers**:

   ```bash
   yarn playwright install --with-deps
   ```

5. **Initialize Git and Husky**:

   ```bash
   git init
   yarn prepare
   ```

6. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

> 📖 For detailed installation instructions with troubleshooting, see [INSTALL.md](./INSTALL.md)

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Qase Test Management Integration (Optional)
QASE_TESTOPS_API_TOKEN=your_qase_api_token_here
QASE_TESTOPS_PROJECT=your_project_code_here

# Base URL (default is already set in playwright.config.ts)
BASE_URL=https://henrijohn.github.io/cv_website/
```

### Playwright Configuration

The `playwright.config.ts` file includes:

- Multi-browser support (Chromium, Firefox, WebKit)
- Mobile viewport testing (Pixel 5, iPhone 12)
- Screenshot on failure
- Video recording on failure
- Trace on first retry
- HTML reporter (auto-open disabled for CI/CD)
- Qase reporter integration

## 🧪 Running Tests

### All Tests

```bash
yarn test
```

### Headed Mode (see browser)

```bash
yarn test:headed
```

### Debug Mode

```bash
yarn test:debug
```

### UI Mode (interactive)

```bash
yarn test:ui
```

### Specific Test Suites

```bash
# Landing page tests only
yarn test:landing

# Showcase page tests only
yarn test:showcase
```

### Specific Test File

```bash
yarn playwright test tests/showcase/form-validation.spec.ts
```

### Specific Browser

```bash
yarn playwright test --project=chromium
yarn playwright test --project=firefox
yarn playwright test --project=webkit
```

### Generate Test Code

```bash
yarn test:codegen
```

## 📊 Test Coverage

### Landing Page Tests (Suite ID: 100)

- ✅ Navigate to landing page
- ✅ Navigate to test showcase
- ✅ Verify explorer panel files
- ✅ Theme toggle functionality
- ✅ Sidebar toggle functionality
- ✅ Terminal interaction
- ✅ Get started and quick command sections

### Test Showcase - Dynamic Content (Suite ID: 101)

- ✅ Dynamic content loading
- ✅ Loading state verification
- ✅ Multiple content loads

### Test Showcase - State Management

- ✅ Counter increment
- ✅ Counter decrement
- ✅ Negative counter values
- ✅ Reset functionality
- ✅ Rapid increment/decrement
- ✅ Button visibility and state

### Test Showcase - Form Validation

- ✅ Successful form submission
- ✅ Username validation (min 3 chars)
- ✅ Email validation (format)
- ✅ Password validation (min 8 chars)
- ✅ Required fields
- ✅ Country dropdown
- ✅ Terms and conditions checkbox
- ✅ Error message clearing

### Test Showcase - Modal Dialog

- ✅ Modal open/close
- ✅ Cancel button functionality
- ✅ Confirm button with success message
- ✅ Modal content verification
- ✅ Multiple modal interactions
- ✅ Overlay interaction
- ✅ Keyboard navigation

### Test Showcase - Data Table

- ✅ Display all rows
- ✅ Filter by Active status
- ✅ Filter by Inactive status
- ✅ Filter by All status
- ✅ Sort by name
- ✅ Table headers
- ✅ Data structure verification
- ✅ Filter buttons functionality
- ✅ Category verification

### Test Showcase - Search Autocomplete

- ✅ Search input visibility
- ✅ Partial text search
- ✅ Clear search
- ✅ Different frameworks search
- ✅ Search icon visibility
- ✅ Special characters handling
- ✅ Numbers in search
- ✅ Long text handling
- ✅ Input focus

## 🏗 Page Object Model

### LandingPage (`landing.pom.ts`)

Handles all interactions with the landing page including:

- Navigation
- File explorer interactions
- Theme and sidebar toggles
- Terminal commands

### TestShowcasePage (`test-showcase.pom.ts`)

Handles all interactions with the test showcase page including:

- Dynamic content loading
- State management (counter)
- Form validation
- Search functionality
- Data table filtering and sorting
- Modal dialog interactions

## 🔧 Utilities

### Faker Utilities (`faker.util.ts`)

- `generateFirstName()` - Random first name
- `generateLastName()` - Random last name
- `generateEmail()` - Random email address
- `generateUsername()` - Random username
- `generatePassword()` - Random password
- `generateStrongPassword()` - Strong password with special chars
- And many more...

### Wait Utilities (`wait.util.ts`)

- `wait()` - Simple delay
- `waitForVisible()` - Wait for element visibility
- `waitForHidden()` - Wait for element to hide
- `waitForURL()` - Wait for URL pattern
- `waitForPageLoad()` - Wait for page load
- `waitForNetworkIdle()` - Wait for network idle
- `waitForCondition()` - Wait for custom condition

## 🪝 Git Hooks

### Pre-commit Hook

Automatically runs before each commit:

- **ESLint** - Lints TypeScript files
- **Prettier** - Formats code
- **Type Check** - Validates TypeScript types

### Setup

Husky is automatically set up when you run `yarn install`. The hooks are configured in `.husky/` directory.

### Manual Hook Execution

```bash
# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check

# Type check
yarn type-check
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow

The project includes a comprehensive CI/CD pipeline with:

#### **Automated Triggers**

- ✅ **Push to main/develop** - Runs full test suite
- ✅ **Pull Requests** - Validates changes before merge
- ✅ **Daily Health Check** - Scheduled at 8:00 AM UTC (10:00 AM SAST)
- ✅ **Manual Dispatch** - Run tests on-demand

#### **Test Execution**

- Multi-browser testing (Chromium, Firefox, WebKit)
- Parallel execution for faster results
- Automatic artifact uploads (reports, screenshots, videos)
- 30-day retention for test reports

#### **Daily Health Check**

The workflow runs automatically every day at 8:00 AM UTC to:

- Verify the CV website is accessible
- Test all interactive features
- Generate health check summary
- Upload test artifacts

**View workflow:** `.github/workflows/playwright.yml`

**Repository:** https://github.com/HenriJohn/cv_website_automation

## 📈 Reporting

### HTML Report

After test execution, view the HTML report:

```bash
yarn test:report
```

### Qase Integration

If configured, test results are automatically uploaded to Qase TestOps:

1. Set `QASE_TESTOPS_API_TOKEN` in `.env`
2. Set `QASE_TESTOPS_PROJECT` in `.env`
3. Run tests - results will be uploaded automatically

### Screenshots and Videos

- Screenshots are captured on test failure
- Videos are recorded for failed tests
- Traces are captured on first retry
- All artifacts are saved in `test-results/` directory

## 🎯 Best Practices

### Test Writing

1. **Use Page Object Model** - All page interactions should go through POM
2. **Descriptive Test Names** - Use clear, descriptive test names
3. **Independent Tests** - Each test should be independent and isolated
4. **Proper Waits** - Use Playwright's auto-waiting, avoid hard-coded waits
5. **Test Data** - Use Faker.js for dynamic test data generation

### Code Quality

1. **TypeScript** - Use proper types, avoid `any`
2. **ESLint** - Follow linting rules
3. **Prettier** - Keep code formatted
4. **Comments** - Add JSDoc comments for utilities and complex logic
5. **DRY Principle** - Extract common logic into utilities (3+ uses)

### Locator Strategy (Priority Order)

1. Test ID selectors: `page.getByTestId('test-id')`
2. Role-based selectors: `page.getByRole('button', { name: 'Text' })`
3. Text-based selectors: `page.getByText('Exact Text')`
4. Placeholder selectors: `page.getByPlaceholder('Placeholder')`
5. XPath selectors: Only when other methods aren't feasible

## 🤝 Contributing

1. Create a feature branch
2. Write tests following the POM pattern
3. Ensure all tests pass
4. Run linting and formatting
5. Commit with descriptive messages
6. Create a pull request

## 📝 License

MIT License - See LICENSE file for details

## 👤 Author

**Henri-John Plaatjies**  
Senior Test Automation Engineer

---

## 🚀 Quick Start Commands

```bash
# Setup (first time only)
corepack enable
yarn install
yarn playwright install --with-deps
git init && yarn prepare

# Run all tests
yarn test

# Run tests with UI (recommended)
yarn test:ui

# Run specific suite
yarn test:landing
yarn test:showcase

# Code quality
yarn lint:fix
yarn format

# View report
yarn test:report
```

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Happy Testing! 🎭**
