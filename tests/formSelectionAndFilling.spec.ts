import {test,expect} from '@playwright/test'
import path from 'path'
import { navigationForm, formFilling} from './Configs/openQaForm'

const filePath = path.resolve('C:/Users/felix/Desktop/example-image-compressed-70-kb.jpeg')

test.describe('finding the form',() =>{
    
    test.beforeEach('finding the form', async ({page})=>{
    const navigateToPage = new navigationForm(page)
    await navigateToPage.formNavigation()
})

test('filling the form then submit',async({page})=>{
    const fillForm = new formFilling(page)
    await fillForm.formFiller('firsname','last name','thisisamail@mail.com','9785412571','direction')
    await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible()
    
    
})

test('lettign the form incomplete then Submit',async({page})=>{
    const fillForm = new formFilling(page)
    await fillForm.formFiller('firsname','','thisisamail@mail.com','9785412571','direction')
    await expect(page.locator('#example-modal-sizes-title-lg')).toBeHidden()

})


})