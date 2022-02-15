context('cy.login() failures', () => {
  it('should not be logged in without calling login()', () => {
    cy.visit('/');

    cy.findByTestId('user-email')
      .invoke('text')
      .should(s => expect(s).to.have.lengthOf(0));
    cy.findByTestId('user-sub')
      .invoke('text')
      .should(s => expect(s).to.have.lengthOf(0));
  });
});
