import { test, expect } from '@playwright/test';

test('Timer app loads and start button is visible', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const startButton = await page.getByRole('button', { name: /start/i });
  await expect(startButton).toBeVisible();
});
