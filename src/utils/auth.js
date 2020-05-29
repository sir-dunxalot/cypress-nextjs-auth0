import auth0 from 'auth0-js';

const auth = new auth0.WebAuth({
  domain: Cypress.env('auth0Domain'),
  clientID: Cypress.env('auth0ClientId'),
});

export default auth;
