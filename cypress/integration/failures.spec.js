context('cy.login() failures', () => {

  it('should not be logged in without calling login()', () => {
    cy.visit('/');

    cy.get('[data-test="user-email"]').invoke('text').should((s) => expect(s).to.have.lengthOf(0));
    cy.get('[data-test="user-sub"]').invoke('text').should((s) => expect(s).to.have.lengthOf(0));
  });

  // This test often brings up an account block for too many failed login attempts (and is hard to test for HTTP response code without direct access to login request)

  // it('should not login with faulty credentials', () => {
  //   cy.login({
  //     username: Cypress.env('auth0Username'),
  //     password: 'password',
  //   }).then(() => {
  //     cy.visit('/');

  //     cy.wait(1000);

  //     cy.get('[data-test="user-email"]').invoke('text').should((s) => expect(s).to.have.lengthOf(0));
  //     cy.get('[data-test="user-sub"]').invoke('text').should((s) => expect(s).to.have.lengthOf(0));
  //   });
  // });

});
