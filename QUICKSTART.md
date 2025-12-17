# ⚡ Quick Start Guide

Get up and running with the Henri-John CV Automation Framework in 5 minutes!

## 🚀 Installation (4 commands)

```bash
# 1. Enable Yarn
corepack enable

# 2. Install dependencies
yarn install

# 3. Install Playwright browsers
yarn playwright install --with-deps

# 4. Initialize Git and Husky
git init && yarn prepare
```

## ✅ Verify Setup

```bash
yarn test:ui
```

This opens Playwright's interactive UI where you can run and debug tests.

## 🎯 Run Your First Tests

### Landing Page Tests

```bash
yarn test:landing
```

### Test Showcase Tests

```bash
yarn test:showcase
```

### All Tests

```bash
yarn test
```

## 🔍 Common Commands

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `yarn test`        | Run all tests headless         |
| `yarn test:headed` | Run tests with browser visible |
| `yarn test:ui`     | Open interactive test UI       |
| `yarn test:debug`  | Run in debug mode              |
| `yarn test:report` | View HTML test report          |
| `yarn lint:fix`    | Fix code issues                |
| `yarn format`      | Format all code                |

## 📂 Project Structure

```
hjp_automation/
├── page-objects/          # Page Object Models
│   ├── landing.pom.ts
│   └── test-showcase.pom.ts
├── tests/                 # Test files
│   ├── landing/
│   └── showcase/
├── utils/                 # Helper functions
└── test-cases/           # Test documentation
```

## 🎭 What's Being Tested?

### Landing Page (7 tests)

- ✅ Page loads correctly
- ✅ Navigation to showcase
- ✅ Theme toggle
- ✅ Sidebar toggle
- ✅ File explorer
- ✅ Terminal interaction

### Test Showcase (50+ tests)

- ✅ Dynamic content loading
- ✅ State management (counter)
- ✅ Form validation
- ✅ Modal dialogs
- ✅ Data table filtering/sorting
- ✅ Search autocomplete

## 🛠 Development Workflow

### 1. Write a Test

```typescript
test('my new test', async ({ page }) => {
  const showcasePage = new TestShowcasePage(page);
  await showcasePage.goto();
  // Your test logic here
});
```

### 2. Run It

```bash
yarn test:ui
```

### 3. Commit (Auto-formatted!)

```bash
git add .
git commit -m "Add new test"
# Husky automatically runs linting and formatting!
```

## 🎨 Code Quality (Automatic!)

Every commit automatically:

- ✅ Lints your TypeScript
- ✅ Formats your code
- ✅ Checks types

No manual intervention needed!

## 📖 Learn More

- **Full Documentation**: [README.md](./README.md)
- **Setup Guide**: [SETUP.md](./SETUP.md)
- **POM Rules**: [.windsurf/rules/page-object-model-rules.md](./.windsurf/rules/page-object-model-rules.md)
- **Test Rules**: [.windsurf/rules/test-file-rules.md](./.windsurf/rules/test-file-rules.md)

## 🆘 Troubleshooting

### Tests Failing?

```bash
# Update browsers
yarn playwright install --with-deps

# Check for errors
yarn type-check
```

### Linting Errors?

```bash
# Auto-fix most issues
yarn lint:fix
yarn format
```

### Need Help?

1. Check [SETUP.md](./SETUP.md) for detailed setup
2. Review [README.md](./README.md) for full documentation
3. Look at existing tests for examples

## 🎉 You're Ready!

Start exploring the tests and happy automating!

```bash
# Open the interactive UI and start testing
yarn test:ui

# Or run specific test suites
yarn test:showcase  # Test showcase features
yarn test:landing   # Landing page tests
```

---

**Made with ❤️ using Playwright + TypeScript + Yarn + Husky**
