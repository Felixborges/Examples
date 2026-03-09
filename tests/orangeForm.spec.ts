import {test,expect} from '@playwright/test'
import { LoginPage } from './commonAspects'
import { text } from 'node:stream/consumers'


let loginStart :LoginPage

test.beforeEach(async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    loginStart = new LoginPage(page)
})

test.describe ('completeUserAndAccountCreation', ()=>{

    const username = `user${Date.now()}`


    test('creatingEmployee',async({page})=>{
        await loginStart.login ('Admin', 'admin123')
        await expect(page).toHaveURL(/dashboard/)
        await page.getByRole("link",{name:'PIM'}).click()
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible()
        await page.getByRole ("button",{name:'Add'}).click()
        await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible()
        await page.getByPlaceholder('First Name').fill(username)
        await page.getByPlaceholder('Middle Name').fill(username)
        await page.getByPlaceholder('Last Name').fill(username)
        
    })

    test('creatingEmployeeAccount',async({page})=>{
        await loginStart.login ('Admin', 'admin123')
        await expect(page).toHaveURL(/dashboard/)
        await page.getByRole("link",{name:'Admin'}).click()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible()
        await page.getByRole ("button",{name:'Add'}).click()
        await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible()
        
        const dropDownSelector= page.locator('.oxd-select-text-input')
        dropDownSelector.nth(0).click()
        await page.getByRole('option', { name: 'Admin' }).click()
        dropDownSelector.nth(1).click()
        await page.getByRole('option', { name: 'Enabled' }).click()
        await page.getByPlaceholder('Type for hints...').fill('bob dohn')
        const fieldSelectors= page.locator('.oxd-input')
        fieldSelectors.nth(0).fill('7characters')
        fieldSelectors.nth(1).fill('7characters')
        fieldSelectors.nth(2).fill('7characters')

    })



})