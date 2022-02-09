// inspired by https://github.com/testing-library/cypress-testing-library/blob/9e480fa32523d947278a483e06ac5802dd2ad7c3/types/index.d.ts#L24-L28

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * cy.login() logs in a user with the given credentials (via Cypress.env)
       * or overwrite the credentials with new credentials.
       */
      login(options?: {
        username?: string;
        password?: string;
      }): Chainable<Element>;

      /**
       * cy.logout() logs out a user. One can overwrite the returnTo and
       * logoutUrl.
       */
      logout(options?: {
        returnTo?: string;
        /**
         * @example "/api/auth/logout"
         */
        logoutUrl?: string;
      }): Chainable<Element>;
    }
  }
}
