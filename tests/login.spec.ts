import {test,expect} from '@playwright/test'
import { LoginPage } from './commonAspects'

let loginStart :LoginPage

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/')
    loginStart = new LoginPage(page)
})


//testing website login


test.describe ('login attempt',()=>{
    
    test('succesfull attempt',async({page})=>{

        await loginStart.login ('standard_user', 'secret_sauce')
        await expect(page).toHaveURL(/inventory/)
    })

    test('failure attempt from wrong user',async({page})=>{
        await loginStart.login ('ldjhdg', 'secret_sauce')
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    })

    test('failure attempt from wrong password',async({page})=>{
        await loginStart.login ('standard_user', '664744')
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    })

    test('failure attempt from not inputing credentials',async({page})=>{
        await page.getByText('Login').click()
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible()
    })
})