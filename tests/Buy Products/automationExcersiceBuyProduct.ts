import { Page,expect } from "@playwright/test";
import { NavigationPage } from "../Configs/automationExcersiceNavigationMethods";

export class buyProductsFromListing {

    readonly page
    constructor(page: Page) {
    this.page = page;
      }

      async selectProdcutsDisplayedOnPageandBuy(){

        const product = this.page.locator('.productinfo:has-text("Blue Top")').first();
        await product.hover();
        await product.locator('.add-to-cart:visible').click();
        await expect (this.page.getByText ('Your product has been added to cart.')).toBeVisible()
        await this.page.getByText('View Cart').click()
        await expect (this.page).toHaveURL(/view_cart/)
        await this.page.getByText('Proceed To Checkout').click()
        await expect (this.page).toHaveURL(/checkout/)
        await this.page.locator('#ordermsg textarea[name="message"]').fill('This is my comment');
        await this.page.getByText('Place Order').click()
        await expect (this.page).toHaveURL(/payment/)
        await this.page.locator('[data-qa="name-on-card"]').fill('randmonnonebba  ')
        await this.page.locator('[data-qa="card-number"]').fill('66496649777144')
        await this.page.locator('[data-qa="cvc"]').fill('985')
        await this.page.locator('[data-qa="expiry-month"]').fill('06')
        await this.page.locator('[data-qa="expiry-year"]').fill('2028')
        await this.page.getByRole("button",{name : 'Pay and Confirm Order'}).click()
        await expect (this.page.getByText ('Congratulations! Your order has been confirmed!')).toBeVisible()
      }


      async selectMultipleProdcutsDisplayedOnPageandBuy(){

        const Navigation = new NavigationPage(this.page)

        await this.page.locator('a[href="#Women"]').click()
        await this.page.getByRole('link', { name: 'Dress' }).click()
        await expect (this.page).toHaveURL(/category_products/)
        await this.page.locator('a[href="/product_details/3"]').click()
        await expect (this.page).toHaveURL(/product_details/)
        await this.page.locator('#quantity').fill('2')
        await this.page.getByText('Add to cart').click()
        await expect (this.page.getByText ('Your product has been added to cart.')).toBeVisible()
        await this.page.getByText('Continue Shopping').click()
        await Navigation.gotoProducts()
        await this.page.locator('a[href="#Women"]').click()
        await this.page.getByRole('link', { name: 'Dress' }).click()
        await expect (this.page).toHaveURL(/category_products/)
        await this.page.locator('a[href="/product_details/4"]').click()
        await expect (this.page).toHaveURL(/product_details/)
        await this.page.locator('#quantity').fill('3')
        await this.page.getByText('Add to cart').click()
        await expect (this.page.getByText ('Your product has been added to cart.')).toBeVisible()
        await this.page.getByText('View Cart').click()
        await expect (this.page).toHaveURL(/view_cart/)
        await this.page.getByText('Proceed To Checkout').click()
        await expect (this.page).toHaveURL(/checkout/)
        await this.page.locator('#ordermsg textarea[name="message"]').fill('This is my comment')
        await this.page.getByText('Place Order').click()
        await expect (this.page).toHaveURL(/payment/)
        await this.page.locator('[data-qa="name-on-card"]').fill('randmonnonebba  ')
        await this.page.locator('[data-qa="card-number"]').fill('66496649777144')
        await this.page.locator('[data-qa="cvc"]').fill('985')
        await this.page.locator('[data-qa="expiry-month"]').fill('06')
        await this.page.locator('[data-qa="expiry-year"]').fill('2028')
        await this.page.getByRole("button",{name : 'Pay and Confirm Order'}).click()
        await expect (this.page.getByText ('Congratulations! Your order has been confirmed!')).toBeVisible()
      }
}