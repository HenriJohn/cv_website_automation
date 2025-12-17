import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class TestShowcasePage {
  readonly page: Page;
  readonly backToCvButton: Locator;
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;

  // Section 1: Dynamic Content Loading
  readonly dynamicContentHeading: Locator;
  readonly loadDynamicContentButton: Locator;
  readonly dynamicContentText: Locator;
  readonly loadingSpinner: Locator;

  // Section 2: State Management
  readonly stateManagementHeading: Locator;
  readonly decrementButton: Locator;
  readonly incrementButton: Locator;
  readonly counterValue: Locator;
  readonly resetButton: Locator;

  // Section 3: Form Validation
  readonly formValidationHeading: Locator;
  readonly usernameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly countryDropdown: Locator;
  readonly termsCheckbox: Locator;
  readonly submitFormButton: Locator;
  readonly usernameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly formSuccessMessage: Locator;

  // Section 4: Search with Autocomplete
  readonly searchHeading: Locator;
  readonly searchInput: Locator;
  readonly searchIcon: Locator;
  readonly autocompleteResults: Locator;

  // Section 5: Data Table
  readonly dataTableHeading: Locator;
  readonly allFilterButton: Locator;
  readonly activeFilterButton: Locator;
  readonly inactiveFilterButton: Locator;
  readonly dataTable: Locator;
  readonly tableNameHeader: Locator;
  readonly tableRows: Locator;

  // Section 6: Modal Dialog
  readonly modalHeading: Locator;
  readonly openModalButton: Locator;
  readonly modalDialog: Locator;
  readonly modalTitle: Locator;
  readonly modalDescription: Locator;
  readonly modalCancelButton: Locator;
  readonly modalConfirmButton: Locator;
  readonly modalSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToCvButton = page.getByRole('button', { name: 'Back to CV' });
    this.pageHeading = page.getByRole('heading', { name: '🎯 Test Automation Showcase' });
    this.pageDescription = page.getByText('Interactive components designed for comprehensive test automation');

    // Section 1: Dynamic Content Loading
    this.dynamicContentHeading = page.getByRole('heading', { name: '1. Dynamic Content Loading' });
    this.loadDynamicContentButton = page.getByTestId('load-dynamic-btn');
    this.dynamicContentText = page.getByText('Dynamic content loaded successfully!');
    this.loadingSpinner = page.getByText('Loading...');

    // Section 2: State Management
    this.stateManagementHeading = page.getByRole('heading', { name: '2. State Management' });
    this.decrementButton = page.getByTestId('counter-decrement');
    this.incrementButton = page.getByTestId('counter-increment');
    this.counterValue = page.getByTestId('counter-value');
    this.resetButton = page.getByTestId('counter-reset');

    // Section 3: Form Validation
    this.formValidationHeading = page.getByRole('heading', { name: '3. Form Validation' });
    this.usernameField = page.getByTestId('form-username');
    this.emailField = page.getByTestId('form-email');
    this.passwordField = page.getByTestId('form-password');
    this.countryDropdown = page.getByTestId('form-country');
    this.termsCheckbox = page.getByTestId('form-terms');
    this.submitFormButton = page.getByTestId('form-submit');
    this.usernameError = page.getByTestId('error-username');
    this.emailError = page.getByTestId('error-email');
    this.passwordError = page.getByTestId('error-password');
    this.formSuccessMessage = page.getByTestId('toast-notification');

    // Section 4: Search with Autocomplete
    this.searchHeading = page.getByRole('heading', { name: '4. Search with Autocomplete' });
    this.searchInput = page.getByTestId('search-input');
    this.searchIcon = page.locator('svg').first();
    this.autocompleteResults = page.getByTestId('search-results');

    // Section 5: Data Table
    this.dataTableHeading = page.getByRole('heading', { name: '5. Data Table (Sort & Filter)' });
    this.allFilterButton = page.getByTestId('filter-all');
    this.activeFilterButton = page.getByTestId('filter-active');
    this.inactiveFilterButton = page.getByTestId('filter-inactive');
    this.dataTable = page.getByTestId('data-table');
    this.tableNameHeader = page.getByTestId('sort-name');
    this.tableRows = page.getByRole('row');

    // Section 6: Modal Dialog
    this.modalHeading = page.getByRole('heading', { name: '6. Modal Dialog' });
    this.openModalButton = page.getByTestId('open-modal-btn');
    this.modalDialog = page.locator('[role="dialog"]');
    this.modalTitle = page.getByRole('heading', { name: 'Test Modal' });
    this.modalDescription = page.getByText('This is a modal dialog for testing overlay interactions');
    this.modalCancelButton = page.getByTestId('modal-cancel');
    this.modalConfirmButton = page.getByTestId('modal-confirm');
    this.modalSuccessMessage = page.getByText('Modal action confirmed!');
  }

  async goto() {
    await this.page.goto('/cv_website/#/test-showcase');
  }

  async backToCV() {
    await this.backToCvButton.click();
    await expect(this.page).toHaveURL(/^(?!.*#\/test-showcase)/);
  }

  async loadDynamicContent() {
    await this.loadDynamicContentButton.click();
    await expect(this.loadingSpinner).toBeVisible();
    await expect(this.dynamicContentText).toBeVisible({ timeout: 5000 });
  }

  async incrementCounter(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.incrementButton.click();
    }
  }

  async decrementCounter(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.decrementButton.click();
    }
  }

  async resetCounter() {
    await this.resetButton.click();
  }

  async getCounterValue(): Promise<string> {
    return await this.counterValue.textContent() || '0';
  }

  async fillForm({
    username = '',
    email = '',
    password = '',
    country = '',
    agreeToTerms = false,
  }: {
    username?: string;
    email?: string;
    password?: string;
    country?: string;
    agreeToTerms?: boolean;
  } = {}) {
    if (username) await this.usernameField.fill(username);
    if (email) await this.emailField.fill(email);
    if (password) await this.passwordField.fill(password);
    if (country) await this.countryDropdown.selectOption(country);
    if (agreeToTerms) await this.termsCheckbox.check();
  }

  async submitForm() {
    await this.submitFormButton.click();
  }

  async searchFramework(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async filterTableByStatus(status: 'All' | 'Active' | 'Inactive') {
    const filterMap = {
      All: this.allFilterButton,
      Active: this.activeFilterButton,
      Inactive: this.inactiveFilterButton,
    };
    await filterMap[status].click();
  }

  async sortTableByName() {
    await this.tableNameHeader.click();
  }

  async getTableRowCount(): Promise<number> {
    return await this.tableRows.count() - 1; // Subtract header row
  }

  async openModal() {
    await this.openModalButton.click();
    await expect(this.modalDialog).toBeVisible();
  }

  async closeModalWithCancel() {
    await this.modalCancelButton.click();
    await expect(this.modalDialog).toBeHidden();
  }

  async closeModalWithConfirm() {
    await this.modalConfirmButton.click();
    await expect(this.modalDialog).toBeHidden();
    await expect(this.modalSuccessMessage).toBeVisible();
  }

  async verifyShowcasePageElements() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageDescription).toBeVisible();
    await expect(this.dynamicContentHeading).toBeVisible();
    await expect(this.stateManagementHeading).toBeVisible();
    await expect(this.formValidationHeading).toBeVisible();
    await expect(this.searchHeading).toBeVisible();
    await expect(this.dataTableHeading).toBeVisible();
    await expect(this.modalHeading).toBeVisible();
  }
}
