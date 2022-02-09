import auth from '../utils/auth';

Cypress.Commands.add('logout', (options = {}) => {
  const { returnTo, logoutUrl } = options;

  const builtLogoutUrl = auth.client.buildLogoutUrl({
    clientID: Cypress.env('auth0ClientId'),
    returnTo: returnTo,
  });
  cy.request(builtLogoutUrl);

  // default URL is the default URL that nextjs-auth0 defines and uses
  cy.visit(logoutUrl || '/api/auth/logout');
});
