import { test, expect } from '@playwright/test';

test.describe('Calculatrice E2E', () => {
  test('should calculate 2 + 2 correctly and display result', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const display = page.locator('#display');
    await expect(display).toHaveValue('4');
  });

  test('should add result to history', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const historyList = page.locator('#history-list');
    await expect(historyList).toContainText('2 + 2 = 4');
  });

  test('should clear the history', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    await page.click('button.clear-history');
    const historyList = page.locator('#history-list');
    await expect(historyList).toHaveText('');
  });
});
