Cypress.Cookies.defaults({
  whitelist: [
    Cypress.env('auth0SessionCookieName'),
    Cypress.env('auth0StateCookieName')
  ],
});
