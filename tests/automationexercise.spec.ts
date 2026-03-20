import { test, expect } from "@playwright/test";
import { LoginPage } from "./Configs/commonAspects";
import { NavigationPage } from "./Configs/automationExcersiceMethods";


test.describe('testBattery for this page',()=>{

    test.beforeEach('start in home page', async ({page})=>{
        const homePageSite= new NavigationPage(page)
        await homePageSite.gotoHome()
    })

    test('creating a new user',async({page})=>{
        const userCreation = new NavigationPage(page)
        await userCreation.generateAndSaveUser()
        await userCreation.LoginAndSingUpPage()
                
    })
})


