/**
 * Preserves cookies from the Auth0 session.
 *
 * ## Docs
 * @see https://docs.cypress.io/api/cypress-api/cookies#Preserve-Once
 *
 * inspired by
 * @see https://github.com/sir-dunxalot/cypress-nextjs-auth0/issues/23#issuecomment-958144472
 */
Cypress.Commands.add('preserveAuth0CookiesOnce', () => {
  Cypress.Cookies.preserveOnce(
    Cypress.env('auth0SessionCookieName'),
    // We assume that the cookie is never splitted into more than 10 parts
    ...Array(10)
      .fill(1)
      .map(
        (value, index) =>
          `${Cypress.env('auth0SessionCookieName')}.${value + index}`,
      ),
  );
});
