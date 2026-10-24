
import { test, expect } from '@playwright/test';
import { registerUser } from '../helpers/register-user';

test('an existing contact can be deleted', async ({ page }) => {
  const contactEmail = `contact-delete-${crypto.randomUUID()}@example.com`;

  await test.step('Register a new user', async () => {
    await registerUser(page);
  });
  
  await test.step('Create a contact to delete', async () => {
    await page.getByRole('button', {
      name: 'Add a New Contact',
    }).click();

    await page.locator('#firstName').fill('Nikos');
    await page.locator('#lastName').fill('Korobos');
    await page.locator('#email').fill(contactEmail);

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/\/contactList$/);
  });

  await test.step('Open the existing contact', async () => {
    const contactRow = page
      .locator('tr.contactTableBodyRow')
      .filter({ hasText: contactEmail });

    await expect(contactRow).toHaveCount(1);
    await contactRow.click();

    await expect(page).toHaveURL(/\/contactDetails$/);
  });

  await test.step('Delete the contact', async () => {
    // Handle the browser confirmation dialog, if one appears.
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.locator('#delete').click();

    await expect(page).toHaveURL(/\/contactList$/);
  });

  await test.step('Verify the contact is gone', async () => {
    await page.reload();

    const deletedContact = page
      .locator('tr.contactTableBodyRow')
      .filter({ hasText: contactEmail });

    await expect(deletedContact).toHaveCount(0);
  });
});
