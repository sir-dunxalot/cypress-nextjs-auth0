context('Cookie expires', () => {
  it('should logout when cookie expires', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.request('/api/auth/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });

      // similar to cy.logout() except that it does not redirect the user, it
      // can be used to mimic the behaviour of expired cookies.
      cy.clearAuth0Cookies();

      cy.request({
        url: '/api/auth/me',
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.equal(401); // Assert user is logged out
      });
    });
  });
});
