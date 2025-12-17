import { Page, Locator } from '@playwright/test';

/**
 * Waits for a specified number of milliseconds
 * @param {number} ms - Number of milliseconds to wait
 * @returns {Promise<void>}
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Waits for an element to be visible
 * @param {Locator} locator - The Playwright Locator for the element
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForVisible(
  locator: Locator,
  timeout: number = 30000
): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

/**
 * Waits for an element to be hidden
 * @param {Locator} locator - The Playwright Locator for the element
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForHidden(
  locator: Locator,
  timeout: number = 30000
): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}

/**
 * Waits for an element to be attached to the DOM
 * @param {Locator} locator - The Playwright Locator for the element
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForAttached(
  locator: Locator,
  timeout: number = 30000
): Promise<void> {
  await locator.waitFor({ state: 'attached', timeout });
}

/**
 * Waits for an element to be detached from the DOM
 * @param {Locator} locator - The Playwright Locator for the element
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForDetached(
  locator: Locator,
  timeout: number = 30000
): Promise<void> {
  await locator.waitFor({ state: 'detached', timeout });
}

/**
 * Waits for the page to reach a specific URL pattern
 * @param {Page} page - The Playwright Page object
 * @param {string | RegExp} urlPattern - URL pattern to wait for
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForURL(
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 30000
): Promise<void> {
  await page.waitForURL(urlPattern, { timeout });
}

/**
 * Waits for the page to finish loading
 * @param {Page} page - The Playwright Page object
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForPageLoad(
  page: Page,
  timeout: number = 30000
): Promise<void> {
  await page.waitForLoadState('load', { timeout });
}

/**
 * Waits for network to be idle
 * @param {Page} page - The Playwright Page object
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @returns {Promise<void>}
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = 30000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Waits for a condition to be true
 * @param {() => Promise<boolean>} condition - Function that returns a boolean
 * @param {number} [timeout=30000] - Maximum time to wait in milliseconds
 * @param {number} [interval=100] - Interval between checks in milliseconds
 * @returns {Promise<void>}
 * @throws {Error} If condition is not met within timeout
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  timeout: number = 30000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await wait(interval);
  }
  throw new Error(`Condition not met within ${timeout}ms`);
}
