/**
 * TODO: document how to put this into `cypress/support/index.js` as suggested
 * by the auth0 docs.
 */
Cypress.Cookies.defaults({
  preserve: [
    Cypress.env('auth0SessionCookieName'),
    // We assume that the cookie is never splitted into more than 10 parts
    ...Array(10)
      .fill(1)
      .map(
        (value, index) =>
          `${Cypress.env('auth0SessionCookieName')}.${value + index}`,
      ),
  ],
});
