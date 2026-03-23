import { Page,expect,Locator } from "@playwright/test";
import { randomGeneratedUserToSaveLater } from "./generateDataFker";
import fs from 'fs';



//to navigate trough pages and do stuff
export class NavigationPage {
  readonly page: Page;
  
  // Deining nav methods of location
  readonly homeLink: Locator;
  readonly loginLink: Locator;
  readonly profileLink: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.loginLink = page.getByRole('link', { name: ' Signup / Login' });
    this.profileLink = page.getByRole('link', { name: 'Mi Perfil' });
    this.userMenu = page.locator('#user-menu')
  }

  async generateAndSaveUser(){
    //this is to create the user data before hand and save it so it can be extracted later
    const fakerUser= randomGeneratedUserToSaveLater()
    fs.writeFileSync('user.json', JSON.stringify(fakerUser, null, 2))
  }
  
  // nevigation methods
  async gotoHome() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.homeLink).toBeVisible();
  }

  

  async loginAndSignUp() {
    const fakerUser = JSON.parse(fs.readFileSync('user.json', 'utf-8'));
    await this.page.getByRole("link",{ name: ' Signup / Login' }).click()
    await expect(this.loginLink).toBeVisible();
    await this.page.locator('[data-qa="login-email"]').fill(fakerUser.email);
    await this.page.locator('[data-qa="login-password"]').fill(fakerUser.password);
    await this.page.getByRole('button', { name: 'Login' }).click()
    await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible()
  }

  async loginAndRegistration() {
    
    await this.page.getByRole("link",{ name: ' Signup / Login' }).click()
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
  }
  
}

