import {test,expect,Page} from '@playwright/test'
import path from 'path'

export class navigationForm{

    constructor(private page:Page){
    this.page=page
  }
  async formNavigation(){
    await this.page.goto('https://demoqa.com/')
    await this.page.getByText('Forms').click()
    await expect(this.page).toHaveURL(/forms/)}
    
}

export class formFilling{

  constructor(private page:Page){
    this.page=page
  }
    async formFiller(name: string,latsName: string,email:string, phoneNumber:string, formAdress:string){
        await this.page.getByText('Practice Form').click()
        await this.page.getByPlaceholder('First Name').fill(name)
        await this.page.getByPlaceholder('Last Name').fill(latsName)
        await this.page.getByPlaceholder('name@example.com').fill(email)
        await this.page.locator('#gender-radio-1').check()
        await this.page.getByPlaceholder('Mobile Number').fill(phoneNumber)
        await this.page.locator('.react-datepicker__input-container').click()
        await this.page.locator('.react-datepicker__year-select').selectOption('2002')
        await this.page.locator('.react-datepicker__month-select').selectOption('2')
        await this.page.locator('.react-datepicker__day--011:not(.react-datepicker__day--outside-month)').click()
        await this.page.locator('#subjectsInput').fill('en')
        await this.page.locator('.subjects-auto-complete__menu-list >> text=English').click()
        await this.page.locator('#hobbies-checkbox-2').check()
        await this.page.locator('#uploadPicture').setInputFiles('images/example-image-compressed-70-kb.jpeg')
        await this.page.getByPlaceholder('Current Address').fill(formAdress)
        await this.page.locator('#state').click()
        await this.page.locator('text=NCR').click()
        await this.page.locator('#city').click()
        await this.page.locator('text=Delhi').click()
        await this.page.getByText('Submit').click()

        }
    
    
}