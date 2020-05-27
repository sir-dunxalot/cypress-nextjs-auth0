context('getUserTokens()', () => {

  it('should return tokens', () => {
    cy.getUserTokens().then((response) => {
      console.log(response);

      expect(arr).to.have.all.keys('accessToken', 'expiresIn', 'idToken', 'scope');

      const { accessToken, expiresIn, idToken, scope } = response;

      expect(accessToken).to.be.a('string');
      expect(idToken).to.be.a('string');
      expect(scope).to.be.a('string');
      expect(expiresIn).to.be.a('number');
    });
  });

});
