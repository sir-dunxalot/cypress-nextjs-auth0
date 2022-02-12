const SESSION_COOKIE_NAME = Cypress.env('auth0SessionCookieName');

Cypress.Commands.add('_clearAuth0Cookie', () => {
  cy.clearCookie(SESSION_COOKIE_NAME);
});

Cypress.Commands.add('_clearAuth0SplittedCookies', () => {
  cy.getCookies().then(cookies => {
    cookies.forEach(cookie => {
      if (cookie.name.startsWith(SESSION_COOKIE_NAME)) {
        cy.clearCookie(cookie.name);
      }
    });
  });
});

Cypress.Commands.add('clearAuth0Cookies', () => {
  cy._clearAuth0Cookie();
  cy._clearAuth0SplittedCookies();
});
