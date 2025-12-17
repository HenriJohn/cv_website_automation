# Pull Request

## 📋 Description

<!-- Provide a brief description of the changes in this PR -->

## 🎯 Type of Change

<!-- Mark the relevant option with an "x" -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 Code style update (formatting, renaming)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Configuration change
- [ ] 🔨 Build/CI update

## 🔗 Related Issues

<!-- Link to related issues using #issue_number -->

Closes #
Related to #

## 🧪 Testing

<!-- Describe the tests you ran and how to reproduce them -->

### Test Commands Run

```bash
# Add commands you used to test
yarn test
yarn lint
```

### Test Results

- [ ] All tests pass locally
- [ ] New tests added for new features
- [ ] Existing tests updated if needed

### Browsers Tested

- [ ] Chromium
- [ ] Firefox
- [ ] WebKit

## 📸 Screenshots/Videos

<!-- If applicable, add screenshots or videos to help explain your changes -->

## ✅ Checklist

<!-- Mark completed items with an "x" -->

### Code Quality

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors
- [ ] I have run `yarn lint:fix` and `yarn format`

### Testing

- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested on multiple browsers (if UI changes)

### Documentation

- [ ] I have updated the documentation accordingly
- [ ] I have updated the README if needed
- [ ] I have added/updated JSDoc comments for new functions
- [ ] I have updated test case JSON files if applicable

### Page Object Model (if applicable)

- [ ] New POMs follow the `.pom.ts` naming convention
- [ ] Locators use proper strategy (test-id → role → text → xpath)
- [ ] All locators are `readonly` and properly typed
- [ ] Constructor initializes all locators

### Test Files (if applicable)

- [ ] Tests follow the `.spec.ts` naming convention
- [ ] Tests use proper tags (`@landing_stable`, `@showcase_stable`)
- [ ] Tests are independent and can run in any order
- [ ] Test names are descriptive and clear

## 🔍 Additional Context

<!-- Add any other context about the PR here -->

## 📝 Reviewer Notes

<!-- Any specific areas you want reviewers to focus on? -->

---

## 🚀 Deployment Notes

<!-- Any special deployment considerations? -->

- [ ] No special deployment steps required
- [ ] Requires environment variable updates
- [ ] Requires dependency updates (`yarn install`)
- [ ] Requires browser reinstall (`yarn playwright install`)

## 📊 Performance Impact

<!-- Does this change affect performance? -->

- [ ] No performance impact
- [ ] Improves performance
- [ ] May impact performance (explain below)

**Performance notes:**

---

**Ready for review:** <!-- Yes/No and why -->
