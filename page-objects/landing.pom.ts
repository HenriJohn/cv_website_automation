import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LandingPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly pageTitle: Locator;
  readonly pageHeading: Locator;
  readonly subtitle: Locator;
  readonly viewShowcaseButton: Locator;
  readonly diamondIcon: Locator;
  readonly getStartedSection: Locator;
  readonly getStartedText: Locator;
  readonly quickCommandSection: Locator;
  readonly quickCommandText: Locator;
  readonly terminalInput: Locator;
  readonly explorerPanel: Locator;
  readonly readmeFile: Locator;
  readonly skillsFile: Locator;
  readonly experienceFolder: Locator;
  readonly educationFile: Locator;
  readonly contactFile: Locator;
  readonly downloadCvFile: Locator;
  readonly themeToggle: Locator;
  readonly sidebarToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('img', { name: 'HJP' });
    this.pageTitle = page.getByText('Henri-John Plaatjies - Senior Test Automation Engineer');
    this.pageHeading = page.getByRole('heading', { name: 'Henri-John Plaatjies' });
    this.subtitle = page.getByText('Senior Test Automation Engineer');
    this.viewShowcaseButton = page.locator('div').filter({ hasText: /^ViewShowcase$/ }).nth(1);
    this.diamondIcon = page.locator('div').filter({ hasText: /^ViewShowcase$/ }).first();
    this.getStartedSection = page.getByText('Get Started', { exact: false });
    this.getStartedText = page.getByText('Select a file from the explorer', { exact: false });
    this.quickCommandSection = page.getByText('Quick Command', { exact: false });
    this.quickCommandText = page.getByText('Type help in terminal', { exact: false });
    this.terminalInput = page.getByRole('textbox');
    this.explorerPanel = page.locator('text=Explorer');
    this.readmeFile = page.locator('text=README.md');
    this.skillsFile = page.locator('text=skills.json');
    this.experienceFolder = page.locator('text=experience');
    this.educationFile = page.locator('text=education.md');
    this.contactFile = page.locator('text=contact.env');
    this.downloadCvFile = page.locator('text=download-cv.pdf');
    this.themeToggle = page.getByRole('generic', { name: 'Switch to light theme' });
    this.sidebarToggle = page.getByRole('generic', { name: 'Toggle Sidebar' });
  }

  async goto() {
    await this.page.goto('/cv_website/');
  }

  async navigateToShowcase() {
    await this.viewShowcaseButton.click();
    await expect(this.page).toHaveURL(/#\/test-showcase/);
  }

  async verifyLandingPageElements() {
    await expect(this.logo).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.subtitle).toBeVisible();
    await expect(this.viewShowcaseButton).toBeVisible();
    await expect(this.explorerPanel).toBeVisible();
  }

  async clickFile(fileName: 'README' | 'skills' | 'education' | 'contact' | 'cv') {
    const fileMap = {
      README: this.readmeFile,
      skills: this.skillsFile,
      education: this.educationFile,
      contact: this.contactFile,
      cv: this.downloadCvFile,
    };
    await fileMap[fileName].click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async toggleSidebar() {
    await this.sidebarToggle.click();
  }

  async typeInTerminal(command: string) {
    await this.terminalInput.fill(command);
    await this.terminalInput.press('Enter');
  }
}
