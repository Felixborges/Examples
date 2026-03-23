import { test, expect } from "@playwright/test";
import { NavigationPage } from "./Configs/automationExcersiceNavigationMethods";
import { UserCreationSite} from "./Configs/automationExecersiceUserCreation"


test.describe('testBattery for this page',()=>{

    test.beforeEach('start in home page', async ({page})=>{
        const homePageSite= new NavigationPage(page)
        await homePageSite.gotoHome()
    })

    test('creating a new user',async({page})=>{
        const userCreation = new UserCreationSite(page)
        await userCreation.CreationofUserandFillingData()
       
                
    })

    test('login in with the freshly created user', async({page})=>{
        const userLogin = new NavigationPage(page)
        
        await userLogin.loginAndSignUp()
    })
})


