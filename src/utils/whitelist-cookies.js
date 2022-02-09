Cypress.Cookies.defaults({
  preserve: [
    Cypress.env('auth0SessionCookieName'),
    // We assume that the cookie is never splitted into more than 10 parts
    ...Array(10)
      .fill(1)
      .map((x, y) => `${Cypress.env('auth0SessionCookieName')}.${x + y}`),
  ],
});
