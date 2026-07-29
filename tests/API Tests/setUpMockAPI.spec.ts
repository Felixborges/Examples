import {test,expect} from '@playwright/test'
import tags from '../API Tests/test-data/tags.json'


/*mocking the tags in the page before each test*/
test.beforeEach(async({page})=>{
    await page.route('*/**/api/tags',async route =>{
    await route.fulfill({
        body: JSON.stringify(tags)
    })})

await page.goto('https://conduit.bondaracademy.com/',{ timeout: 90000 })
})


/*checking the response of the mock tags, also intercepting and generating a mock article*/
test("checking mock response", async ({ page }) => {

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