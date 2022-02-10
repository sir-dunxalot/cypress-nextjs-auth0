import auth from '../utils/auth';

Cypress.Commands.add('logout', (options = {}) => {
  const { returnTo, logoutUrl } = options;

  const builtLogoutUrl = auth.client.buildLogoutUrl({
    clientID: Cypress.env('auth0ClientId'),
    returnTo: returnTo,
  });
  cy.request(builtLogoutUrl);

  /**
   * Because we preserved cookies they might not be deleted by now. That is why
   * we force them to be deleted.
   *
   * TODO: needs further investigation if this is the way to go when handling
   * logouts in Cypress.
   */
  cy.clearAuth0Cookies();

  /**
   * default URL is the default URL that nextjs-auth0 defines and uses
   */
  cy.visit(logoutUrl || '/api/auth/logout');
});
