import {test,expect} from '@playwright/test'



/*creating and deleting a dumy article in the page*/
test("create and delete and article", async ({ page }) => {

    await page.route('*/**/api/articles*', async route =>{
    const response = await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title="this is a testtitle"
    responseBody.articles[0].description="this is a descriptions"

    await route.fulfill({
        body: JSON.stringify(responseBody)
    })})
    await expect(page.locator('.navbar-brand'),).toHaveText('conduit');
    await expect(page.locator('app-article-list h1').first()).toContainText('this is a testtitle')
    await expect(page.locator('app-article-list p').first()).toContainText('this is a descriptions')
  })