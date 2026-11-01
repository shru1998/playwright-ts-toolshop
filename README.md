# Playwright TypeScript E2E Automation — Practice Software Testing (Toolshop)

An end-to-end web automation framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/), structured using the [Page Object Model (POM)](https://playwright.dev/docs/pom) and custom Playwright fixtures against **Toolshop v5** ([Practice Software Testing](https://github.com/testsmith-io/practice-software-testing) — `https://practicesoftwaretesting.com`), a modern Angular + REST API e-commerce hardware store designed specifically for QA engineering.

## Why Toolshop Instead of SauceDemo?

- **Realistic Modern Stack**: Built on an Angular SPA frontend backed by a live Laravel REST API (`https://api.practicesoftwaretesting.com`), exercising real asynchronous network requests, dynamic routing, and form validation.
- **Native Test IDs**: Configured with `testIdAttribute: 'data-test'` in `playwright.config.ts` to use Playwright's resilient `page.getByTestId()` locators across navigation menus, product cards, cart badges, and forms.
- **Dependency-Injected Page Objects**: Uses `test.extend` in `src/fixtures/baseTest.ts` so test files stay clean, declarative, and free of repetitive instantiation boilerplate.

## Project Structure

```text
playwright-ts-toolshop/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI workflow
├── src/
│   ├── data/
│   │   └── testData.ts             # Centralized product & form test data
│   ├── fixtures/
│   │   └── baseTest.ts             # Custom Playwright fixtures injecting Page Objects
│   └── pages/
│       ├── ProductCatalogPage.ts   # Page Object for Category navigation, Product details & Cart
│       └── ContactPage.ts          # Page Object for Customer Support Contact form
├── tests/
│   ├── catalogCart.spec.ts         # Test 1: Category filtering, quantity increment & Cart persistence
│   └── contactSupport.spec.ts      # Test 2: Customer Support form submission & alert assertion
├── .env.example                    # Sample environment variables template
├── .gitignore                      # Ignores node_modules, reports, traces, and .env
├── package.json                    # Dependencies and npm runner scripts
├── playwright.config.ts            # Cross-browser configuration & data-test attribute binding
├── tsconfig.json                   # Strict TypeScript compiler configuration
└── README.md                       # Project documentation
```

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   npx playwright install --with-deps
   ```

2. **Optional — Create local `.env`**:
   ```bash
   cp .env.example .env
   ```

3. **Run the tests**:
   ```bash
   npm test                 # Run all tests across Chromium, Firefox, and WebKit
   npm run test:chromium    # Run in Chromium only
   npm run test:headed      # Run in headed browser mode
   npm run test:ui          # Open interactive Playwright UI Mode
   npm run report           # View HTML execution report
   ```

## Included End-to-End Test Scenarios

| Spec File | Scenario | Validations Covered |
| :--- | :--- | :--- |
| `tests/catalogCart.spec.ts` | **Catalog Filtering & Cart Persistence (`@smoke`)** | Navigates to **Categories > Hand Tools**, selects **Claw Hammer with Shock Reduction Grip**, increments quantity to `2`, adds to cart, verifies the header cart badge updates to `2`, and asserts both item name and spinbutton quantity inside the cart table. |
| `tests/contactSupport.spec.ts` | **Customer Support Inquiry (`@smoke`)** | Navigates to `/contact` via the top bar, populates customer details, selects the `payments` subject dropdown, submits a valid inquiry message, and verifies the `.alert-success` confirmation banner (`"Thanks for your message! We will contact you shortly."`). |
# playwright-ts-toolshop

