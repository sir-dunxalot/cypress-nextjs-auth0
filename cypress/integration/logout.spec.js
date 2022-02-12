context('cy.logout()', () => {
  it('should logout', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.get('[data-test="user-email"]').should(e =>
        expect(e).to.contain(Cypress.env('auth0Username')),
      );
      cy.get('[data-test="user-sub"]')
        .invoke('text')
        .should(s => expect(s).to.have.length.of.at.least(1));

      cy.logout();

      cy.get('[data-test="user-email"]')
        .invoke('text')
        .should(s => expect(s).to.have.lengthOf(0));
      cy.get('[data-test="user-sub"]')
        .invoke('text')
        .should(s => expect(s).to.have.lengthOf(0));

      cy.getCookies().then(cookies => {
        const foundCookie = cookies.find(cookie =>
          cookie.name.startsWith(Cypress.env('auth0SessionCookieName')),
        );

        expect(foundCookie).to.be.undefined;
      });
    });
  });

  it('should logout with a custom returnTo URL', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.get('[data-test="user-email"]').should(e =>
        expect(e).to.contain(Cypress.env('auth0Username')),
      );
      cy.get('[data-test="user-sub"]')
        .invoke('text')
        .should(s => expect(s).to.have.length.of.at.least(1));

      cy.logout('/return-to');

      cy.get('h1').contains('Custom Return To Page');

      cy.getCookies().then(cookies => {
        const foundCookie = cookies.find(cookie =>
          cookie.name.startsWith(Cypress.env('auth0SessionCookieName')),
        );

        expect(foundCookie).to.be.undefined;
      });
    });
  });
});
