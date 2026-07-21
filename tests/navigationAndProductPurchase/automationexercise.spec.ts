import { test, expect } from "@playwright/test";
import { NavigationPage } from "../Configs/automationExcersiceNavigationMethods";
import { UserCreationSite } from "../Configs/automationExecersiceUserCreation";
import { buyProductsFromListing } from "../Buy Products/automationExcersiceBuyProduct";

test.describe("Simple flow of user Creation and buying a product", () => {
  test.beforeEach("start in home page", async ({ page }) => {
    const homePageSite = new NavigationPage(page);
    await homePageSite.gotoHome();
  });

  test("creating a new user", async ({ page }) => {
    const userCreation = new UserCreationSite(page);
    await userCreation.generateAndSaveUser();
    await userCreation.CreationofUserandFillingData();
  });

  test("login in with the freshly created user", async ({ page }) => {
    const userLogin = new NavigationPage(page);
    await userLogin.loginAndSignUp();
  });

  test("add produtc to cart", async ({ page }) => {
    const normalUser = {
      access: new NavigationPage(page),
      buyProduct: new buyProductsFromListing(page),
    };
    await normalUser.access.loginAndSignUp();
    await normalUser.buyProduct.selectMultipleProdcutsDisplayedOnPageandBuy();
  });

  test("add multiple products to cart", async ({ page }) => {
    const normalUser = {
      access: new NavigationPage(page),
      buyProduct: new buyProductsFromListing(page),
    };
    await normalUser.access.loginAndSignUp();
    await normalUser.access.gotoProducts();
    await normalUser.buyProduct.selectMultipleProdcutsDisplayedOnPageandBuy();
  });
});
