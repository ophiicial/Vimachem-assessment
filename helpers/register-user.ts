
import { expect, type Page } from '@playwright/test';

export async function registerUser(page: Page): Promise<void> {
  const email = `qa-${crypto.randomUUID()}@example.com`;

  await page.goto(
    'https://thinking-tester-contact-list.herokuapp.com/addUser'
  );

  await page.locator('#firstName').fill('Test');
  await page.locator('#lastName').fill('User');
  await page.locator('#email').fill(email);
  await page.locator('#password').fill('Testing123!');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL(/\/contactList$/);
  await expect(
    page.getByRole('button', { name: 'Add a New Contact' })
  ).toBeVisible();
}
