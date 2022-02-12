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
       * Logs the logged in user out. One can add a custom returnTo URL.
       */
      logout(returnTo?: string): Chainable<Element>;

      /**
       * Clears all existing (splitted or not) Auth0 cookies
       *
       * ## Docs
       * @see https://docs.cypress.io/api/commands/clearcookie
       * @see https://docs.cypress.io/api/commands/clearcookies
       */
      clearAuth0Cookies(): Chainable<Element>;

      /**
       * Preserves cookies through multiple tests. It's best used in the
       * `beforeEach` hook.
       *
       * ## Docs
       * @see https://docs.cypress.io/api/cypress-api/cookies#Preserve-Once
       */
      preserveAuth0Cookies(): Chainable<Element>;
    }
  }
}
