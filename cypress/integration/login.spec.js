const credentialsDefault = {
  username: Cypress.env('auth0Username'),
  password: Cypress.env('auth0Password'),
};

const credentialsAlt = {
  username: Cypress.env('auth0UsernameAlt'),
  password: Cypress.env('auth0PasswordAlt'),
};

context('cy.login()', () => {
  it('should login and authenticate an API call', () => {
    cy.login().then(() => {
      cy.request('http://localhost:3000/api/auth/me').then(({ body: user }) => {
        expect(user).to.have.property('sub');
        expect(user).to.have.property('email');

        const { email, sub } = user;

        expect(email).to.equal(credentialsDefault.username);
        expect(sub).to.be.a('string');
      });
    });
  });

  it('should login and authenticate an indirect API call', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.get('[data-test="user-email"]').should(e =>
        expect(e).to.contain(credentialsDefault.username),
      );
      cy.get('[data-test="user-sub"]')
        .invoke('text')
        .should(s => expect(s).to.have.length.of.at.least(1));
    });
  });

  it('should stay logged in after refresh', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.reload();

      cy.get('[data-test="user-email"]').should(e =>
        expect(e).to.contain(credentialsDefault.username),
      );
      cy.get('[data-test="user-sub"]')
        .invoke('text')
        .should(s => expect(s).to.have.length.of.at.least(1));
    });
  });

  it('should stay logged in after navigation', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.visit('/account');

      cy.location('pathname').should('equal', '/account');

      cy.get('[data-test="user-email"]').should(e =>
        expect(e).to.contain(credentialsDefault.username),
      );
      cy.get('[data-test="user-sub"]')
        .invoke('text')
        .should(s => expect(s).to.have.length.of.at.least(1));
    });
  });

  it('should login with alternative credentials', () => {
    cy.login(credentialsAlt).then(() => {
      cy.request('http://localhost:3000/api/auth/me').then(({ body: user }) => {
        expect(user).to.have.property('sub');
        expect(user).to.have.property('email');

        const { email, sub } = user;

        expect(email).to.not.equal(credentialsDefault.username);
        expect(email).to.equal(credentialsAlt.username);
        expect(sub).to.be.a('string');
      });
    });
  });
});
