const tests = [
  {
    title: 'Cookie',
    credentials: undefined,
  },
  {
    title: 'Split Cookie',
    credentials: {
      username: Cypress.env('auth0UsernameSplitCookie'),
      password: Cypress.env('auth0PasswordSplitCookie'),
    },
  },
];

for (const { title, credentials } of tests) {
  /**
   * Cypress automatically clears all cookies before each test to prevent state
   * from building up, that's why we test preserving cookies here.
   */
  context(title, () => {
    before(() => {
      cy.login(credentials);
    });

    beforeEach(() => {
      cy.preserveAuth0CookiesOnce();
    });

    it('user login should preserve cookies', () => {
      cy.visit('/');

      cy.request('/api/auth/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });
    });

    it('user should be logged in still', () => {
      cy.visit('/');

      cy.findByTestId('user-email').should(
        'have.text',
        Cypress.env('auth0Username'),
      );
    });

    after(() => {
      cy.logout();
    });
  });
}
