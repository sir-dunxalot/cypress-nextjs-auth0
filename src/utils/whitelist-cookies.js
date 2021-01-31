Cypress.Cookies.defaults({
  preserve: [
    Cypress.env('auth0SessionCookieName'),
    Cypress.env('auth0StateCookieName')
  ],
});
