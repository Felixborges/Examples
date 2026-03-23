import { Page,expect,Locator } from "@playwright/test";
import { randomGeneratedUserToSaveLater } from "./generateDataFker";
import { NavigationPage } from "./automationExcersiceNavigationMethods";
import fs from 'fs';

export class UserCreationSite{

    readonly page
    constructor(page: Page) {
    this.page = page;
      }


    async generateAndSaveUser(){
        //this is to create the user data before hand and save it so it can be extracted later
        const fakerUser= randomGeneratedUserToSaveLater()
        fs.writeFileSync('user.json', JSON.stringify(fakerUser, null, 2))
      }

      async CreationofUserandFillingData(){
    
        const fakerUser = JSON.parse(fs.readFileSync('user.json', 'utf-8'));
        const navigatiomehtods = new NavigationPage(this.page)


        await navigatiomehtods.loginAndRegistration()
        await this.page.getByPlaceholder('Name').fill(fakerUser.firstName)
        await this.page.locator('[data-qa="signup-email"]').fill(fakerUser.email)
        await this.page.getByRole("button",{name : 'SignUp'}).click()
        
        //user gets redirected into the creation page where it fill the rest of the information
        await expect(this.page.getByText('Enter Account Information')).toBeVisible()
        await this.page.locator ('#uniform-id_gender2').check()
        await this.page.locator('[data-qa="password"]').fill(fakerUser.password)
        await this.page.selectOption('[data-qa="days"]',fakerUser.day)
        await this.page.selectOption('[data-qa="months"]',fakerUser.month)
        await this.page.selectOption('[data-qa="years"]',fakerUser.year)
        await this.page.locator('[data-qa="first_name"]').fill(fakerUser.firstName)
        await this.page.locator('[data-qa="last_name"]').fill(fakerUser.lastName)
        await this.page.locator('[data-qa="address"]').fill(fakerUser.adress)
        await this.page.locator('[data-qa="country"]').click()
        await this.page.locator('select[data-qa="country"]').selectOption('United States')
        await this.page.locator('[data-qa="state"]').fill('NYC')
        await this.page.locator('[data-qa="city"]').fill('ne york city')
        await this.page.locator('[data-qa="zipcode"]').fill('5546513134')
        await this.page.locator('[data-qa="mobile_number"]').fill(fakerUser.phoneNumber)
        await this.page.getByRole("button",{name : 'Create Account'}).click()
        await expect (this.page).toHaveURL('https://automationexercise.com/account_created')
  }
}