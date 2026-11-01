import { type Locator, type Page, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly navContactLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectSelect: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navContactLink = page.getByTestId('nav-contact');
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.emailInput = page.getByTestId('email');
    this.subjectSelect = page.getByTestId('subject');
    this.messageInput = page.getByTestId('message');
    this.submitButton = page.getByTestId('contact-submit');
    this.successAlert = page.locator('.alert-success');
  }

  async gotoViaNavigation(): Promise<void> {
    await this.page.goto('/');
    await this.navContactLink.click();
    await expect(this.page).toHaveURL(/.*contact/);
  }

  async submitSupportInquiry(
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.subjectSelect.selectOption(subject);
    await this.messageInput.fill(message);
    await this.submitButton.click();
  }

  async expectSubmissionSuccess(expectedBannerText: string): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toHaveText(expectedBannerText);
  }
}
