/**
 * Cypress automatically clears all cookies before each test to prevent state
 * from building up, that's why we test preserving cookies here.
 */
context('Cookie', () => {
  before(() => {
    cy.login();
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

    cy.get('[data-test="user-email"]').should(e =>
      expect(e).to.contain(Cypress.env('auth0Username')),
    );
  });
});
