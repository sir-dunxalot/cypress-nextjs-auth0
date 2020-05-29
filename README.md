## Installation

Step 1: Install the addon.

```sh
yarn add cypress-nextjs-auth0 --dev
```

Step 2: Import the commands in your Cypress support file.

```js
// your-app/cypress/support/index.js

import 'cypress-nextjs-auth0';
```

Step 3: Configure Auth0.

1. Enable the `Password` Grant Type to your Auth0 Application
2. Set your Auth0 tenant's default directory to `Username-Password-Authentication`
3. Create a test user
4. Add your cypress port URL (e.g. `http://localhost:3001`) to your Auth0 Application's 'Allowed Origins (CORS)' list
  - Note, if you don't specify a port when you run Cypress you will need to add a port to your `cypress.json` file. For example:

```json
{
  "port": 3001
}
```

Step 4: Add Auth0 credentials to your `cypress.env.json` file:

```json
{
  "auth0Audience": "https://YOUR_APP.auth0.com/api/v2/",
  "auth0Domain": "YOUR_APP.auth0.com",
  "auth0ClientId": "YOUR_CLIENT_ID",
  "auth0ClientSecret": "YOUR_CLIENT_SECRET",
  "auth0CookieSecret": "YOUR_RANDOM_COOKIE_SECRET",
  "auth0Password": "TEST_USER_PASSWORD",
  "auth0Scope": "openid profile email",
  "auth0SessionCookieName": "a0:session",
  "auth0StateCookieName": "a0:state",
  "auth0Username": "TEST_USER_EMAIL"
}
```

For example:

```json
{
  "auth0Audience": "https://lyft.auth0.com/api/v2/",
  "auth0Domain": "lyft.auth0.com",
  "auth0ClientId": "FNfof292fnNFwveldfg9222rf",
  "auth0ClientSecret": "FNo3i9f2fbFOdFH8f2fhsooi496bw4uGDif3oDd9fmsS18dDn",
  "auth0CookieSecret": "DB208FHFQJFNNA28F0N1F8SBNF8B20FBA0BXSD29SSJAGSL12D9922929D",
  "auth0Password": "mysupersecurepassword",
  "auth0Scope": "openid profile email",
  "auth0SessionCookieName": "a0:session",
  "auth0StateCookieName": "a0:state",
  "auth0Username": "testuser@lyft.com"
}

```

## Usage

The following commands are now available in your test suite:

- `login()`
- `logout()`

### login()

Call login at the start of a test. For example:

```js
context('Logging in', () => {
  it('should login', () => {
    cy.login().then(() => {

      // Now run your test...
      cy.request('/api/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });
    });
  });
});
```

Or in a `beforeEach()` loop. For example:

```js
context('Logging in', () => {

  beforeEach(() => {
    cy.login();
  })

  it('should login', () => {
    cy.request('/api/me').then(({ body: user }) => {
      expect(user.email).to.equal(Cypress.env('auth0Username'));
    });
  });
});
```

You can also pass a `username` and `password` to `login()`:

```js
context('Logging in', () => {
  it('should login', () => {
    cy.login({
      username: 'anotheremail@lyft.com',
      password: 'mygreatpassword',
    }).then(() => {

      // Now run your test...
      cy.request('/api/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });
    });
  });
});
```

### logout()

Call `logout()` anywhere in a test. For example:

```js
context('Logging out', () => {

  it('should logout', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.request('/api/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });

      cy.logout();

      cy.request('/api/me', {
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
      });
    });
  });

});
```

You can pass a return URL to `logout()`, which the user will be taken to after a successful logout:

```js
context('Logging out', () => {

  it('should logout', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.logout('/thanks-for-visiting');
    });
  });
});
```
