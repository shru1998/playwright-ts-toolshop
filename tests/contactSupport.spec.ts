import { test } from '../src/fixtures/baseTest';
import { CONTACT_INQUIRY } from '../src/data/testData';

test.describe('Customer Support Contact Form @smoke', () => {
  test('Test 2: Should navigate to Contact page, submit a customer support inquiry, and verify confirmation alert', async ({
    contactPage,
  }) => {
    await test.step('Open Contact page via main navigation bar', async () => {
      await contactPage.gotoViaNavigation();
    });

    await test.step('Complete and submit the support contact form', async () => {
      await contactPage.submitSupportInquiry(
        CONTACT_INQUIRY.firstName,
        CONTACT_INQUIRY.lastName,
        CONTACT_INQUIRY.email,
        CONTACT_INQUIRY.subject,
        CONTACT_INQUIRY.validMessage
      );
    });

    await test.step('Verify confirmation alert banner is displayed', async () => {
      await contactPage.expectSubmissionSuccess(CONTACT_INQUIRY.successBannerText);
    });
  });
});
