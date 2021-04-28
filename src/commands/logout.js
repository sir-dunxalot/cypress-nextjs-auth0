import auth from '../utils/auth';

Cypress.Commands.add('logout', (returnTo) => {
  const options = {
    clientID: Cypress.env('auth0ClientId'),
  };

  if (returnTo) {
    options.returnTo = returnTo;
  }

  const logoutUrl = auth.client.buildLogoutUrl(options);

  cy.request('/api/auth/logout');
  cy.reload();
});
