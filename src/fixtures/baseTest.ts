import { test as base, expect } from '@playwright/test';
import { ProductCatalogPage } from '../pages/ProductCatalogPage';
import { ContactPage } from '../pages/ContactPage';

type AppFixtures = {
  productCatalogPage: ProductCatalogPage;
  contactPage: ContactPage;
};

export const test = base.extend<AppFixtures>({
  productCatalogPage: async ({ page }, use) => {
    await use(new ProductCatalogPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect };
