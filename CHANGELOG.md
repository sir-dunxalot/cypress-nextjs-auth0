# cypress-nextjs-auth0

## Unreleased

### Features

- **Breaking**: `cy.logout` now accepts an object containing `returnTo` and
  `logoutUrl`
- added new command `cy.clearAuth0Cookies()` to clear all auth0 cookies manually
  anytime
- added support for customizing cookie settings similar to how `nextjs-auth0`
  does (e.g. with `auth0CookieHttpOnly`). Take a look at the README for more
  details.
- updated `types` to include `cy.clearAuth0Cookies()` and fixed outdated ones

### Fixes

- `cy.login` checks if the size of the `encryptedSession` is too big and
  requires cookies to be splitted into multiple ones
- `cy.logout` now clears auth0 cookies
