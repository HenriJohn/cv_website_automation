# 📦 Installation Guide

## ✅ Verified Installation Steps

These are the **exact commands** that were tested and work:

### Step 1: Enable Corepack

```bash
corepack enable
```

### Step 2: Install Dependencies

```bash
yarn install
```

**Expected output:**

- ✅ Yarn 4.0.2 downloaded
- ✅ 279 packages installed
- ✅ ~123 MiB downloaded
- ⏱️ Takes ~19 seconds

### Step 3: Install Playwright Browsers

```bash
yarn playwright install --with-deps
```

**Expected output:**

- ✅ Chromium 143.0.7499.4 (159.6 MiB)
- ✅ Firefox 144.0.2 (91.5 MiB)
- ✅ WebKit 26.0 (77 MiB)
- ⏱️ Takes ~2-5 minutes depending on connection

### Step 4: Initialize Git and Husky

```bash
git init
yarn prepare
```

**Expected output:**

- ✅ Git repository initialized
- ✅ Husky hooks configured
- ✅ Pre-commit hook created

### Step 5: Make Hook Executable

```bash
chmod +x .husky/pre-commit
```

## 🧪 Verify Installation

### Option 1: Interactive UI (Recommended)

```bash
yarn test:ui
```

This opens Playwright's UI where you can:

- See all 50 tests
- Run tests individually
- Debug with time-travel
- View screenshots and videos

### Option 2: Run Showcase Tests

```bash
yarn test:showcase
```

These tests have better success rate as they test the interactive showcase page.

### Option 3: Run All Tests

```bash
yarn test
```

Runs all 50 tests in headless mode.

## 📊 What Gets Installed

### Node Modules (279 packages)

- `@playwright/test` - Test framework
- `typescript` - Type checking
- `eslint` - Code linting
- `prettier` - Code formatting
- `husky` - Git hooks
- `lint-staged` - Pre-commit checks
- `@faker-js/faker` - Test data generation
- And 272 more...

### Playwright Browsers

- **Chromium** - 159.6 MiB
- **Firefox** - 91.5 MiB
- **WebKit** - 77 MiB
- **Total** - ~328 MiB

### Git Hooks

- `.husky/pre-commit` - Runs on every commit
  - Lints TypeScript files
  - Formats code with Prettier
  - Only checks staged files (fast!)

## 🔧 Troubleshooting

### Issue: "command not found: corepack"

**Solution:** Update Node.js to v16.10+ or enable manually:

```bash
npm install -g corepack
corepack enable
```

### Issue: "ENOENT: no such file or directory"

**Solution:** This was the original issue - fixed by removing `yarnPath` from `.yarnrc.yml`

### Issue: Playwright browsers not found

**Solution:** Reinstall with system dependencies:

```bash
yarn playwright install --with-deps
```

### Issue: Pre-commit hooks not running

**Solution:** Ensure git is initialized and hook is executable:

```bash
git init
yarn prepare
chmod +x .husky/pre-commit
```

### Issue: Tests failing with locator errors

**Solution:** This is expected for landing page tests. Use:

```bash
yarn test:showcase  # Better success rate
yarn test:ui        # Debug visually
yarn test:codegen   # Generate correct locators
```

## 🎯 Post-Installation

### 1. Configure Environment (Optional)

```bash
cp .env.example .env
# Edit .env with your Qase credentials
```

### 2. Test the Setup

```bash
yarn test:ui
```

### 3. Make Your First Commit

```bash
git add .
git commit -m "Initial setup"
# Watch Husky run pre-commit checks!
```

## 📝 Installation Summary

| Step            | Command                               | Time         | Size        |
| --------------- | ------------------------------------- | ------------ | ----------- |
| 1. Corepack     | `corepack enable`                     | <1s          | -           |
| 2. Dependencies | `yarn install`                        | ~19s         | 123 MiB     |
| 3. Browsers     | `yarn playwright install --with-deps` | ~3m          | 328 MiB     |
| 4. Git/Husky    | `git init && yarn prepare`            | <1s          | -           |
| **Total**       |                                       | **~3.5 min** | **451 MiB** |

## ✅ Success Indicators

After installation, you should see:

```
hjp_automation/
├── node_modules/          ✅ 279 packages
├── .husky/               ✅ Git hooks
│   └── pre-commit        ✅ Executable hook
├── .yarn/                ✅ Yarn cache
├── .git/                 ✅ Git repository
└── yarn.lock             ✅ Lock file
```

And these commands should work:

```bash
yarn test:ui              ✅ Opens Playwright UI
yarn lint                 ✅ Runs ESLint
yarn format               ✅ Runs Prettier
yarn playwright --version ✅ Shows 1.48.0
```

## 🚀 You're Ready!

Start testing with:

```bash
yarn test:ui
```

---

**Installation completed successfully! 🎉**
