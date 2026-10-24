# Vimachem — Playwright QA Assessment

Browser automation tests for the [Thinking Tester Contact List](https://thinking-tester-contact-list.herokuapp.com/) application, written in TypeScript using Playwright.

## Test coverage

| Scenario | Description |
|---|---|
| 1. Registration and contact creation | Register a new user, create a contact, and verify its information on the contact details page. |
| 2. Invalid date of birth | Submit an invalid DOB and verify the application's validation error. |
| 3. Contact deletion | Create a contact, delete it, and confirm it no longer appears in the contact list. |

Each test registers a fresh user to avoid depending on other tests or existing accounts. Test data is synthetic.

## Requirements

- Node.js 24
- npm

## Install

```bash
npm ci
npx playwright install chromium
```

## Run tests

```bash
npm test
```

To watch the browser execution:

```bash
npm run test:headed
```

## View results

After running the tests, open the Playwright HTML report:

```bash
npm run test:report
```

The report includes named execution steps and browser traces. Screenshots and videos are retained for failures.

## Continuous integration

GitHub Actions runs the suite on pushes and pull requests to `main`. Tests can also be started manually through the **Actions** tab.

Each run uploads its Playwright HTML report as a downloadable artifact, including traces for investigation.

## Notes

Tests use the public Thinking Tester demo environment. Test results may be affected by service availability or changes to the application's behaviour.