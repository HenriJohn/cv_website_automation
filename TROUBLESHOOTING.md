# 🔧 Troubleshooting Guide

## GitHub Actions Not Running

### Issue
No workflow runs appear in the Actions tab.

### Possible Causes
1. **Actions not enabled** - GitHub Actions might be disabled for the repository
2. **Workflow file location** - File must be in `.github/workflows/`
3. **Branch mismatch** - Workflow configured for wrong branch
4. **First push** - First workflow might take a few minutes to appear

### Solutions

#### 1. Enable GitHub Actions
1. Go to: https://github.com/HenriJohn/cv_website_automation/settings/actions
2. Under "Actions permissions", select "Allow all actions and reusable workflows"
3. Click "Save"

#### 2. Manually Trigger Workflow
1. Go to: https://github.com/HenriJohn/cv_website_automation/actions
2. Click on "Playwright Tests" workflow
3. Click "Run workflow" button
4. Select "master" branch
5. Click "Run workflow"

#### 3. Check Workflow File
```bash
# Verify file exists
ls -la .github/workflows/playwright.yml

# Check if it's valid YAML
cat .github/workflows/playwright.yml
```

## Tests Failing with "Site not found"

### Issue
Tests show error: `Expected pattern: /Henri-John Plaatjies/` but received `"Site not found · GitHub Pages"`

### Root Cause
The CV website repository (https://github.com/HenriJohn/cv_website) might not have GitHub Pages enabled or published.

### Solutions

#### 1. Verify CV Website is Published
1. Go to: https://github.com/HenriJohn/cv_website/settings/pages
2. Ensure GitHub Pages is enabled
3. Source should be set to a branch (usually `main` or `gh-pages`)
4. Wait a few minutes for deployment
5. Verify site loads at: https://henrijohn.github.io/cv_website/

#### 2. Test the URL Manually
```bash
# Check if site is accessible
curl -I https://henrijohn.github.io/cv_website/

# Should return HTTP 200, not 404
```

#### 3. Update Base URL (if needed)
If your CV website is at a different URL, update `playwright.config.ts`:

```typescript
use: {
  baseURL: 'https://your-actual-url.com',
  // ...
}
```

#### 4. Run Tests Against Correct URL
```bash
# Test with custom base URL
BASE_URL=https://henrijohn.github.io/cv_website/ yarn test
```

## Local Test Execution Issues

### Issue: Syntax Errors
**Error:** `Unexpected token ','`

**Solution:** Already fixed in commit 94bb65c. Pull latest changes:
```bash
git pull origin master
```

### Issue: ESLint Warnings
**Error:** `playwright/no-wait-for-timeout` warnings

**Solution:** These are warnings, not errors. Tests will still run. To fix:
1. Replace `page.waitForTimeout()` with proper waits
2. Or disable the rule in `.eslintrc.json`

### Issue: Import Errors
**Error:** `Cannot find module '@playwright/test'`

**Solution:**
```bash
yarn install
yarn playwright install --with-deps
```

## GitHub Actions Workflow Issues

### Workflow Not Triggering on Push

#### Check 1: Verify Branch Name
Workflow triggers on `main` and `develop` branches. If your branch is `master`:

**Option A:** Rename branch to `main`
```bash
git branch -m master main
git push -u origin main
```

**Option B:** Update workflow file
Edit `.github/workflows/playwright.yml`:
```yaml
on:
  push:
    branches: [main, develop, master]  # Add master
```

#### Check 2: Workflow Syntax
```bash
# Validate workflow file
cat .github/workflows/playwright.yml | grep -A 5 "on:"
```

### Scheduled Workflow Not Running

**Note:** Scheduled workflows only run on the default branch (usually `main`).

**Solution:**
1. Set `main` as default branch in GitHub settings
2. Or rename `master` to `main`

## Common Test Failures

### 1. Timeout Errors
**Error:** `Timeout 30000ms exceeded`

**Solutions:**
- Increase timeout in `playwright.config.ts`
- Check if website is slow to load
- Verify internet connection

### 2. Locator Not Found
**Error:** `Locator not found`

**Solutions:**
- Use `yarn test:ui` to debug
- Check if element exists on page
- Update locator in POM file
- Use `yarn test:codegen` to generate correct locators

### 3. Navigation Errors
**Error:** `net::ERR_NAME_NOT_RESOLVED`

**Solutions:**
- Verify baseURL is correct
- Check internet connection
- Ensure website is published and accessible

## Quick Fixes

### Reset Everything
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
yarn playwright install --with-deps

# Run tests
yarn test:ui
```

### Debug Single Test
```bash
# Run one test in debug mode
yarn test:debug tests/landing/landing-page.spec.ts:15
```

### Generate Correct Locators
```bash
# Open codegen tool
yarn test:codegen https://henrijohn.github.io/cv_website/
```

## Getting Help

### Check Logs
```bash
# View test results
cat test-results/results.json

# View HTML report
yarn test:report
```

### GitHub Actions Logs
1. Go to Actions tab
2. Click on failed workflow run
3. Click on failed job
4. Expand failed step
5. Read error messages

### Contact
- **Repository:** https://github.com/HenriJohn/cv_website_automation
- **Issues:** https://github.com/HenriJohn/cv_website_automation/issues

---

## Quick Command Reference

```bash
# Enable Actions (via GitHub UI)
open https://github.com/HenriJohn/cv_website_automation/settings/actions

# Manually trigger workflow
open https://github.com/HenriJohn/cv_website_automation/actions

# Test locally
yarn test:ui

# Debug tests
yarn test:debug

# View report
yarn test:report

# Check site status
curl -I https://henrijohn.github.io/cv_website/
```
