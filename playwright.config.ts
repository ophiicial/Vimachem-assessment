
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    browserName: 'chromium',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
