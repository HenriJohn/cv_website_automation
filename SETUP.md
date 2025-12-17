# 🚀 Setup Guide

This guide will help you set up the Henri-John CV Automation Framework from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Visual Studio Code** (recommended): ([Download](https://code.visualstudio.com/))

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hjp_automation
```

### 2. Enable Corepack (for Yarn)

Corepack is included with Node.js 16.10+ and allows you to use Yarn without a separate installation.

```bash
corepack enable
```

If you encounter permission issues on macOS/Linux:

```bash
sudo corepack enable
```

### 3. Verify Yarn Installation

```bash
yarn --version
# Should output: 4.0.2 or similar
```

### 4. Install Dependencies

```bash
yarn install
```

This will:

- Install all npm packages (279 packages)
- Configure the project
- Download Yarn 4.0.2 if needed

### 5. Install Playwright Browsers

Install browsers with system dependencies (recommended):

```bash
yarn playwright install --with-deps
```

This downloads:

- Chromium 143.0.7499.4
- Firefox 144.0.2
- WebKit 26.0

### 6. Initialize Git and Husky

```bash
git init
yarn prepare
```

This sets up:

- Git repository
- Husky git hooks
- Pre-commit checks

### 7. Set Up Environment Variables (Optional)

If you want to use Qase test management integration:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```env
QASE_TESTOPS_API_TOKEN=your_api_token_here
QASE_TESTOPS_PROJECT=your_project_code
```

### 8. Verify Installation

Run a quick test to ensure everything is working:

```bash
yarn test:ui
```

This will open Playwright's UI mode where you can run tests interactively.

Or run tests in headless mode:

```bash
yarn test:showcase
```

## Git Hooks Setup

Husky is automatically configured during `yarn install`. The following hooks are active:

### Pre-commit Hook

Runs automatically before each commit:

- Lints TypeScript files with ESLint
- Formats code with Prettier
- Only processes staged files (fast!)

To manually trigger the pre-commit checks:

```bash
yarn pre-commit
```

### Manual Hook Installation

If hooks aren't working, ensure git is initialized and reinstall:

```bash
git init
yarn prepare
chmod +x .husky/pre-commit
```

## IDE Setup (VS Code)

### Recommended Extensions

Install these VS Code extensions for the best experience:

1. **Playwright Test for VSCode** (`ms-playwright.playwright`)
2. **ESLint** (`dbaeumer.vscode-eslint`)
3. **Prettier** (`esbenp.prettier-vscode`)
4. **TypeScript** (built-in)

### VS Code Settings

Add to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript"],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Troubleshooting

### Issue: Yarn command not found

**Solution**: Enable Corepack

```bash
corepack enable
```

### Issue: Playwright browsers not installed

**Solution**: Install browsers

```bash
yarn playwright install --with-deps
```

### Issue: Permission denied on git hooks

**Solution**: Make hooks executable

```bash
chmod +x .husky/*
```

### Issue: ESLint errors on first run

**Solution**: Run auto-fix

```bash
yarn lint:fix
```

### Issue: TypeScript errors

**Solution**: Check TypeScript compilation

```bash
yarn type-check
```

## Yarn Commands Cheat Sheet

### Package Management

```bash
yarn install              # Install dependencies
yarn add <package>        # Add a package
yarn add -D <package>     # Add a dev dependency
yarn remove <package>     # Remove a package
yarn upgrade              # Upgrade all packages
yarn upgrade <package>    # Upgrade specific package
```

### Testing

```bash
yarn test                 # Run all tests
yarn test:headed          # Run with browser visible
yarn test:debug           # Run in debug mode
yarn test:ui              # Run in UI mode
yarn test:landing         # Run landing page tests
yarn test:showcase        # Run showcase tests
yarn test:report          # View HTML report
```

### Code Quality

```bash
yarn lint                 # Lint code
yarn lint:fix             # Fix linting issues
yarn format               # Format code
yarn format:check         # Check formatting
yarn type-check           # Check TypeScript types
```

### Git Hooks

```bash
yarn prepare              # Set up Husky
yarn pre-commit           # Run pre-commit checks
```

## Next Steps

1. **Explore the tests**: Check out the `tests/` directory
2. **Review Page Objects**: Look at `page-objects/` for the POM pattern
3. **Run tests**: Try `yarn test:ui` for interactive testing
4. **Read the README**: Full documentation in `README.md`
5. **Write your first test**: Follow the POM pattern in existing tests

## Quick Test Run

To verify everything is working:

```bash
# Run landing page tests only
yarn test:landing

# Run in headed mode to see the browser
yarn test:headed tests/landing/landing-page.spec.ts

# Run with UI for debugging
yarn test:ui
```

## Getting Help

- Check the [README.md](./README.md) for detailed documentation
- Review the [.windsurf/rules](./.windsurf/rules/) for coding standards
- Look at existing tests for examples
- Check Playwright documentation: https://playwright.dev

---

**You're all set! Happy testing! 🎭**
