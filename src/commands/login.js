let cachedUsername;

Cypress.Commands.add('login', (credentials = {}) => {
  const { username, password } = credentials;
  const cachedUserIsCurrentUser = cachedUsername && cachedUsername === username;
  const _credentials = {
    username: username || Cypress.env('auth0Username'),
    password: password || Cypress.env('auth0Password'),
  };

  const sessionCookieName = Cypress.env('auth0SessionCookieName');

  /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/login.ts#L70 */

  try {
    cy.getCookie(sessionCookieName).then(cookieValue => {
      /* Skip logging in again if session already exists */

      if (cookieValue && cachedUserIsCurrentUser) {
        return true;
      } else {
        cy.clearCookies();

        cy.getUserTokens(_credentials).then(response => {
          const { accessToken, expiresIn, idToken, scope } = response;

          cy.getUserInfo(accessToken).then(user => {
            /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/callback.ts#L44 */
            /* https://github.com/auth0/nextjs-auth0/blob/master/src/handlers/callback.ts#L47 */
            /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L57 */

            const payload = {
              secret: Cypress.env('auth0CookieSecret'),
              user,
              idToken,
              accessToken,
              accessTokenScope: scope,
              accessTokenExpiresAt: Date.now() + expiresIn,
              createdAt: Date.now(),
            };

            /* https://github.com/auth0/nextjs-auth0/blob/master/src/session/cookie-store/index.ts#L73 */

            cy.task('encrypt', payload).then(encryptedSession => {
              cy._setAuth0Cookie(encryptedSession);
            });
          });
        });
      }
    });
  } catch (error) {
    // throw new Error(error);
  }
});
