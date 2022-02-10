// inspired by https://github.com/testing-library/cypress-testing-library/blob/9e480fa32523d947278a483e06ac5802dd2ad7c3/types/index.d.ts#L24-L28

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Logs in a user with the given credentials (via Cypress.env)
       * or overwrite the credentials with new credentials.
       */
      login(options?: {
        username?: string;
        password?: string;
      }): Chainable<Element>;

      /**
       * Logs the logged in user out. One can overwrite the returnTo and
       * logoutUrl.
       */
      logout(options?: {
        returnTo?: string;
        /**
         * @example "/api/auth/logout"
         */
        logoutUrl?: string;
      }): Chainable<Element>;

      /**
       * Clears all existing (splitted or not) Auth0 cookies
       */
      clearAuth0Cookies(): Chainable<Element>;
    }
  }
}
