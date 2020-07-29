declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}
