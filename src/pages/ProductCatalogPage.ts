import { type Locator, type Page, expect } from '@playwright/test';

export class ProductCatalogPage {
  readonly page: Page;
  readonly navCategories: Locator;
  readonly navHandTools: Locator;
  readonly navCart: Locator;
  readonly cartQuantityBadge: Locator;
  readonly productNameHeader: Locator;
  readonly increaseQuantityButton: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartTableBody: Locator;
  readonly cartQuantitySpinbutton: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navCategories = page.getByTestId('nav-categories');
    this.navHandTools = page.getByTestId('nav-hand-tools');
    this.navCart = page.getByTestId('nav-cart');
    this.cartQuantityBadge = page.getByTestId('cart-quantity');
    this.productNameHeader = page.getByTestId('product-name');
    this.increaseQuantityButton = page.getByTestId('increase-quantity');
    this.quantityInput = page.getByTestId('quantity');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.cartTableBody = page.locator('tbody');
    this.cartQuantitySpinbutton = page.getByRole('spinbutton');
    this.proceedToCheckoutButton = page.getByTestId('proceed-1');
  }

  async gotoHome(): Promise<void> {
    await this.page.goto('/');
  }

  async navigateToHandTools(): Promise<void> {
    await this.navCategories.click();
    await this.navHandTools.click();
  }

  async openProductByName(productName: string): Promise<void> {
    const productCard = this.page.locator('[data-test^="product-"]').filter({ hasText: productName }).first();
    await productCard.click();
    await expect(this.productNameHeader).toContainText(productName);
  }

  async setQuantityToTwoAndAddToCart(): Promise<void> {
    await this.increaseQuantityButton.click();
    await expect(this.quantityInput).toHaveValue('2');
    await this.addToCartButton.click();
    await expect(this.cartQuantityBadge).toContainText('2');
  }

  async openCartAndVerifyItem(productName: string, expectedQuantity: string): Promise<void> {
    await this.navCart.click();
    await expect(this.cartTableBody).toContainText(productName);
    await expect(this.cartQuantitySpinbutton).toHaveValue(expectedQuantity);
    await expect(this.proceedToCheckoutButton).toBeVisible();
  }
}
