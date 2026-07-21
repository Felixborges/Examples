import { test, expect } from "@playwright/test"


  test("dynamic id for objects", async ({ page }) => {
    await page.goto('http://uitestingplayground.com/dynamicid',{ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/dynamicid/);
    await page.getByRole('button',{ name: 'Button with Dynamic ID' }).click()
  })