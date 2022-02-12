context('cy.getUserTokens()', () => {
  it('should return tokens', () => {
    cy.getUserTokens().then(response => {
      const tokenKeys = [
        'accessToken',
        'expiresIn',
        'idToken',
        'scope',
        'tokenType',
      ];

      expect(response).to.have.all.keys(...tokenKeys);

      const { accessToken, expiresIn, idToken, scope, tokenType } = response;

      expect(accessToken).to.be.a('string');
      expect(idToken).to.be.a('string');
      expect(scope).to.be.a('string');
      expect(expiresIn).to.be.a('number');
      expect(tokenType).to.equal('Bearer');
    });
  });
});
