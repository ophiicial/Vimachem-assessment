
import { test, expect } from '@playwright/test';
import { registerUser } from '../helpers/register-user';

test('invalid date of birth is rejected', async ({ page }) => {
    await test.step('Register a new user', async () => {
    await registerUser(page);
  });

  await test.step('Submit a contact with an invalid DOB', async () => {
    await page.getByRole('button', {
      name: 'Add a New Contact',
    }).click();

    await page.locator('#firstName').fill('Nikos');
    await page.locator('#lastName').fill('Korobos');
    await page.locator('#birthdate').fill('1995-13-40');

    await page.getByRole('button', { name: 'Submit' }).click();
  });


    await test.step('Verify the invalid DOB error', async () => {
    await expect(page).toHaveURL(/\/addContact$/);

    await expect(
        page.getByText(
        'Contact validation failed: birthdate: Birthdate is invalid',
        { exact: true }
        )
    ).toBeVisible();

    await expect(page.locator('#birthdate'))
        .toHaveValue('1995-13-40');
    });

});
