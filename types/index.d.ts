interface loginCredentials {
  username?: string,
  password?: string
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(loginCredentials): Chainable<Element>;
    login(): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}
