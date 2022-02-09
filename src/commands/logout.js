import auth from '../utils/auth';

Cypress.Commands.add('logout', (options = {}) => {
  const { returnTo, logoutUrl } = options;

  const builtLogoutUrl = auth.client.buildLogoutUrl({
    clientID: Cypress.env('auth0ClientId'),
    returnTo: returnTo,
  });

  cy.request(builtLogoutUrl);
  cy.request(logoutUrl || '/api/auth/logout');

  cy.reload();
});
