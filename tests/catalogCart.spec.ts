import { test } from '../src/fixtures/baseTest';
import { PRODUCTS } from '../src/data/testData';

test.describe('Toolshop Product Catalog & Cart Persistence @smoke', () => {
  test('Test 1: Should filter Hand Tools category, update item quantity, and persist items in the shopping cart', async ({
    productCatalogPage,
  }) => {
    await test.step('Navigate to Toolshop home page and filter by Hand Tools category', async () => {
      await productCatalogPage.gotoHome();
      await productCatalogPage.navigateToHandTools();
    });

    await test.step('Open product details, increment quantity to 2, and add to cart', async () => {
      await productCatalogPage.openProductByName(PRODUCTS.clawHammer.name);
      await productCatalogPage.setQuantityToTwoAndAddToCart();
    });

    await test.step('Open shopping cart and verify persisted product line item and quantity', async () => {
      await productCatalogPage.openCartAndVerifyItem(
        PRODUCTS.clawHammer.name,
        PRODUCTS.clawHammer.quantity
      );
    });
  });
});
