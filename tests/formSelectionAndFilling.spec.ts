import {test,expect} from '@playwright/test'
import path from 'path'

const filePath = path.resolve('C:/Users/felix/Desktop/example-image-compressed-70-kb.jpeg')

test.describe('finding the form',() =>{
    
    test.beforeEach('finding the form', async ({page})=>{
    await page.goto('https://demoqa.com/')
    await page.getByText('Forms').click()
    await expect(page).toHaveURL(/forms/)
})

test('filling the form',async({page})=>{

    await page.getByText('Practice Form').click()
    await page.getByPlaceholder('First Name').fill('name')
    await page.getByPlaceholder('Last Name').fill('latsName')
    await page.getByPlaceholder('name@example.com').fill('thisisamail@mail.com')
    await page.locator('#gender-radio-1').check()
    await page.getByPlaceholder('Mobile Number').fill('3698521478')
    await page.locator('.react-datepicker__input-container').click()
    await page.locator('.react-datepicker__year-select').selectOption('2002')
    await page.locator('.react-datepicker__month-select').selectOption('2')
    await page.locator('.react-datepicker__day--011:not(.react-datepicker__day--outside-month)').click()
    await page.locator('#subjectsInput').fill('en')
    await page.locator('.subjects-auto-complete__menu-list >> text=English').click()
    await page.locator('#hobbies-checkbox-2').check()
    await page.locator('#uploadPicture').setInputFiles(filePath)
    await page.getByPlaceholder('Current Address').fill('this is an adress')
    await page.locator('#state').click()
    await page.locator('text=NCR').click()
    await page.locator('#city').click()
    await page.locator('text=Delhi').click()
    await page.getByText('Submit').click()
    await expect.anything()
    
    
})


})