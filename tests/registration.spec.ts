
import { test, expect } from '@playwright/test';
import { registerUser } from '../helpers/register-user';

test('a new user can register and add a contact', async ({ page }) => {
  await test.step('Register a new user', async () => {
    await registerUser(page);
  });

const contact = {
  firstName: 'Nikos',
  lastName: 'Korobos',
  birthdate: '1995-04-12',
  email: `contact-${Date.now()}@example.com`,
  phone: '8005551234',
};

await test.step('Open the Add Contact form', async () => {
  await page.getByRole('button', {
    name: 'Add a New Contact',
  }).click();

  await expect(page).toHaveURL(/\/addContact$/);
});

await test.step('Create a new contact', async () => {
  await page.locator('#firstName').fill(contact.firstName);
  await page.locator('#lastName').fill(contact.lastName);
  await page.locator('#birthdate').fill(contact.birthdate);
  await page.locator('#email').fill(contact.email);
  await page.locator('#phone').fill(contact.phone);

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL(/\/contactList$/);
});

await test.step('Open the newly created contact', async () => {
  const contactRow = page
    .locator('tr.contactTableBodyRow')
    .filter({ hasText: contact.email });

  await expect(contactRow).toHaveCount(1);
  await contactRow.click();

  await expect(page).toHaveURL(/\/contactDetails$/);
});

await test.step('Verify the saved contact details', async () => {
  const details = page.locator('body');

  await expect(details).toContainText(contact.firstName);
  await expect(details).toContainText(contact.lastName);
  await expect(details).toContainText(contact.email);
  await expect(details).toContainText(contact.phone);
  await expect(details).toContainText(contact.birthdate);
});

});
