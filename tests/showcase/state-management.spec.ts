
import { test, expect } from '@playwright/test';
import { TestShowcasePage } from '../../page-objects/test-showcase.pom';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Test Showcase - State Management', { tag: '@showcase_stable' }, () => {
  let showcasePage: TestShowcasePage;

  test.beforeEach(async ({ page }) => {
    showcasePage = new TestShowcasePage(page);
    await showcasePage.goto();
  });

  test('verify counter increments correctly', async () => {
    // Verify initial state
    const initialValue = await showcasePage.getCounterValue();
    expect(initialValue).toBe('0');

    // Increment once
    await showcasePage.incrementCounter(1);
    await expect(showcasePage.counterValue).toContainText('1');

    // Increment multiple times
    await showcasePage.incrementCounter(4);
    await expect(showcasePage.counterValue).toContainText('5');
  });

  test('verify counter decrements correctly', async () => {
    // First increment to have a positive value
    await showcasePage.incrementCounter(5);
    await expect(showcasePage.counterValue).toContainText('5');

    // Decrement once
    await showcasePage.decrementCounter(1);
    await expect(showcasePage.counterValue).toContainText('4');

    // Decrement multiple times
    await showcasePage.decrementCounter(3);
    await expect(showcasePage.counterValue).toContainText('1');
  });

  test('verify counter can go negative', async () => {
    // Start at 0
    const initialValue = await showcasePage.getCounterValue();
    expect(initialValue).toBe('0');

    // Decrement below zero
    await showcasePage.decrementCounter(3);
    await expect(showcasePage.counterValue).toContainText('-3');
  });

  test('verify reset button resets counter to zero', async () => {
    // Increment counter
    await showcasePage.incrementCounter(7);
    await expect(showcasePage.counterValue).toContainText('7');

    // Reset counter
    await showcasePage.resetCounter();
    await expect(showcasePage.counterValue).toContainText('0');

    // Test with negative value
    await showcasePage.decrementCounter(5);
    await expect(showcasePage.counterValue).toContainText('-5');

    // Reset again
    await showcasePage.resetCounter();
    await expect(showcasePage.counterValue).toContainText('0');
  });

  test('verify rapid increment and decrement', async () => {
    // Rapidly increment
    await showcasePage.incrementCounter(10);
    await expect(showcasePage.counterValue).toContainText('10');

    // Rapidly decrement
    await showcasePage.decrementCounter(15);
    await expect(showcasePage.counterValue).toContainText('-5');

    // Reset
    await showcasePage.resetCounter();
    await expect(showcasePage.counterValue).toContainText('0');
  });

  test('verify all buttons are visible and enabled', async () => {
    // Verify all state management buttons
    await expect(showcasePage.incrementButton).toBeVisible();
    await expect(showcasePage.incrementButton).toBeEnabled();

    await expect(showcasePage.decrementButton).toBeVisible();
    await expect(showcasePage.decrementButton).toBeEnabled();

    await expect(showcasePage.resetButton).toBeVisible();
    await expect(showcasePage.resetButton).toBeEnabled();

    await expect(showcasePage.counterValue).toBeVisible();
  });
});
