import {test,expect} from '@playwright/test'


test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/')
})

//testing website login


test.describe ('login attempt',()=>{
    
    test('succesfull attempt',async({page})=>{
        await page.getByPlaceholder ('Username'). fill('standard_user')
        await page.getByPlaceholder ('Password'). fill('secret_sauce')
        await page.getByText('Login').click()
        await expect(page).toHaveURL(/inventory/)
    })

    test('failure attempt from wrong user',async({page})=>{
        await page.getByPlaceholder ('Username'). fill('daddr')
        await page.getByPlaceholder ('Password'). fill('secret_sauce')
        await page.getByText('Login').click()
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    })

    test('failure attempt from wrong password',async({page})=>{
        await page.getByPlaceholder ('Username'). fill('standard_user')
        await page.getByPlaceholder ('Password'). fill('sjdha')
        await page.getByText('Login').click()
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    })

    test('failure attempt from not inputing credentials',async({page})=>{
        await page.getByText('Login').click()
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
    })
})