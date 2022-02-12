# cypress-nextjs-auth0

[![Node CI](https://github.com/sir-dunxalot/cypress-nextjs-auth0/actions/workflows/ci.yml/badge.svg)](https://github.com/sir-dunxalot/cypress-nextjs-auth0/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/cypress-nextjs-auth0.svg)](https://www.npmjs.com/package/cypress-nextjs-auth0)

## Contents

* [cypress-nextjs-auth0](#cypress-nextjs-auth0)
  * [Contents](#contents)
  * [Compatibility](#compatibility)
  * [Installation](#installation)
    * [Step 1: Install the addon](#step-1-install-the-addon)
    * [Step 2: Import the commands](#step-2-import-the-commands)
    * [Step 3: Register the task](#step-3-register-the-task)
    * [Step 4: Create a test user](#step-4-create-a-test-user)
    * [Step 5: Add Auth0 credentials](#step-5-add-auth0-credentials)
    * [Step 6: Configure Auth0](#step-6-configure-auth0)
    * [Cookie Settings](#cookie-settings)
    * [Installation troubleshooting](#installation-troubleshooting)
  * [Usage](#usage)
    * [login()](#login)
    * [logout()](#logout)
    * [clearAuth0Cookies()](#clearauth0cookies)
    * [preserveAuth0CookiesOnce()](#preserveauth0cookiesonce)
    * [Preserving Cookies](#preserving-cookies)
    * [Security considerations](#security-considerations)
      * [Use separate tenants](#use-separate-tenants)
      * [Storing credentials](#storing-credentials)
      * [Continuous integration](#continuous-integration)
  * [Contributing](#contributing)
  * [Releasing](#releasing)

## Compatibility

- For `@auth0/nextjs-auth0` version `^1.0.0` use `^2.0.0` of this library
  (documentation is on master branch)
- For `@auth0/nextjs-auth0` version `^0.0.0` use `^1.0.0` of this library
  ([documentation is here](https://github.com/sir-dunxalot/cypress-nextjs-auth0/blob/d3b46cf49772486678f4c5a41bfba7e2638ee1c5/README.md))

## Installation

### Step 1: Install the addon

```sh
yarn add cypress-nextjs-auth0 --dev
```

### Step 2: Import the commands

```js
// cypress/support/index.js

import 'cypress-nextjs-auth0';
```

### Step 3: Register the task

```js
// cypress/plugins/index.js

const encrypt = require('cypress-nextjs-auth0/encrypt');

module.exports = (on, config) => {
  on('task', { encrypt });
};
```

### Step 4: Create a test user

Create a user in your Auth0 app that you will use specifically for testing.

In [security considerations](#security-considerations) you will see that
[Auth0 recommends you use separate tenant for each environment](https://auth0.com/docs/dev-lifecycle/setting-up-env)
(e.g. `development`, `testing`, `production`, etc). Consider creating this test
user in a test-specific Auth0 tenant.

You'll need this user's email and password to complete `auth0Username` and
`auth0Password` in step 4.

### Step 5: Add Auth0 credentials

Add the following environment variables using
[one of Cypress' supported methods](https://docs.cypress.io/guides/guides/environment-variables.html#Setting)
(this code example assumes you are using a `cypress.env.json` file).

Replacing values with your Auth0 application's values:

```json
// cypress.env.json

{
  "auth0Audience": "https://lyft.auth0.com/api/v2/",
  "auth0Domain": "lyft.auth0.com",
  "auth0ClientId": "FNfof292fnNFwveldfg9222rf",
  "auth0ClientSecret": "FNo3i9f2fbFOdFH8f2fhsooi496bw4uGDif3oDd9fmsS18dDn",
  "auth0CookieSecret": "DB208FHFQJFNNA28F0N1F8SBNF8B20FBA0BXSD29SSJAGSL12D9922929D",
  "auth0Scope": "openid profile email",
  "auth0SessionCookieName": "appSession",
  "auth0LogoutUrl": "/api/auth/logout",
  "auth0ReturnToUrl": "/",
  "auth0Username": "testuser@lyft.com",
  "auth0Password": "mysupersecurepassword"
}
```

Everything except `auth0Username` and `auth0Password` should match your app's
existing Auth0 settings.

`auth0Username` and `auth0Password` are the email and password of the test user
you created in step 3.

### Step 6: Configure Auth0

**Step 6.1**: Go to your Auth0 Application settings and enable the `Password`
Grant Type:

![auth0-grant-types](https://user-images.githubusercontent.com/4495352/83317105-6fed3780-a1f8-11ea-8d86-192e7e25f84b.jpg)

**Step 6.2**: Go to your
[Auth0 tenant's settings](https://manage.auth0.com/#/tenant) (make sure tenant
name is correct in top-left of the page) and set the default directory to
`Username-Password-Authentication`:

![auth0-default-directory](https://user-images.githubusercontent.com/4495352/83317130-898e7f00-a1f8-11ea-9a19-0386e06ef4fb.jpg)

If you have changed the name of your default directory (i.e. your tenant's
default database name), you should replace `Username-Password-Authentication`
with your database's name, as it's shown in the Auth0 UI. Click on 'databases'
in the sidebar of the Auth0 dashboard to view your database(s).

**Step 6.3**: Add your cypress port URL (e.g. `http://localhost:3001`) to your
Auth0 Application's 'Allowed Origins (CORS)' list:

If you don't yet specify a port when you run Cypress you will need to add a port
to your `cypress.json` file. For example:

```json
// cypress.json

{
  "port": 3001
}
```

### Cookie Settings

If you have further customized your Auth0 cookie (see
[CookieConfig](https://auth0.github.io/nextjs-auth0/interfaces/config.cookieconfig.html)),
you have to add the following environment variables to your Cypress
configuration:

```sh
// cypress.env.json

{
  "auth0CookiePath": "/",
  "auth0CookieHttpOnly": "true",
  "auth0CookieCookieSameSite": "lax" ,
  "auth0CookieCookieSecure": "true",
  "auth0CookieTransient": "false",
}
```

Please, take a look at the offical
[documentation](https://auth0.github.io/nextjs-auth0/interfaces/config.cookieconfig.html)
for more details.

### Installation troubleshooting

Make sure you have authorized the `@auth0/nextjs-auth0` callback in your tenant
settings `Allowed Callback URLs` field:

```
http://localhost:3000/api/auth/callback
```

Some developers report needing to disable `chromeWebSecurity` in Cypress:

```json
// cypress.json

{
  "port": 3001,
  "chromeWebSecurity": false
}
```

## Usage

The following commands are now available in your test suite:

- [login()](#login)
- [logout()](#logout)
- [clearAuth0Cookies()](#clearAuth0Cookies)
- [preserveAuth0CookiesOnce()](#preserveauth0cookiesonce)

### login()

| Property               | Type     | Default value                  | Required? |
| ---------------------- | -------- | ------------------------------ | --------- |
| `credentials`          | `Object` | None                           | No        |
| `credentials.username` | `String` | `Cypress.env('auth0Username')` | No        |
| `credentials.password` | `String` | `Cypress.env('auth0Password')` | No        |

Call login at the start of a test. For example:

```js
context('Logging in', () => {
  it('should login', () => {
    cy.login().then(() => {
      // Now run your test...
      cy.request('/api/auth/me').then(({ body: user }) => {
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
  });

  it('should login', () => {
    cy.request('/api/auth/me').then(({ body: user }) => {
      expect(user.email).to.equal(Cypress.env('auth0Username'));
    });
  });
});
```

You can also pass `credentials` to `login()`:

```js
context('Logging in', () => {
  it('should login', () => {
    cy.login({
      username: 'anothertestuser@lyft.com',
      password: 'mygreatpassword',
    }).then(() => {
      // Now run your test...
      cy.request('/api/auth/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });
    });
  });
});
```

If you want multiple test users, it's recommended to include their credentials
in `cypress.env.json` rather than in your source code.

### logout()

```js
cy.logout();
```

| Property            | Type     | Default value | Required? |
| ------------------- | -------- | ------------- | --------- |
| `options`           | `Object` | None          | No        |
| `options.returnTo`  | `String` | None          | No        |
| `options.logoutUrl` | `String` | None          | No        |

Call `logout()` anywhere in a test. For example:

```js
context('Logging out', () => {
  it('should logout', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.request('/api/auth/me').then(({ body: user }) => {
        expect(user.email).to.equal(Cypress.env('auth0Username'));
      });

      cy.logout();

      cy.request({
        url: '/api/auth/me',
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.equal(401); // Assert user is logged out
      });
    });
  });
});
```

You can pass a return URL to `logout()`, which the user will be taken to after a
successful logout. Make sure you have added the `returnTo` URL to your Auth0
Application's `Allowed Logout URLs` field.

```js
context('Logging out', () => {
  it('should logout', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.logout({ returnTo: '/thanks-for-visiting' });
    });
  });
});
```

You can pass a custom logoutUrl `logout()`, which the user will be taken to to
log out:

```js
context('Logging out', () => {
  it('should logout', () => {
    cy.login().then(() => {
      cy.visit('/');

      cy.logout({ logoutUrl: '/api/auth/logout' });
    });
  });
});
```

You may want to logout after every test:

```js
// cypress/support.index.js

import 'cypress-nextjs-auth0';

beforeEach(() => {
  cy.logout();
});
```

### clearAuth0Cookies()

```js
cy.clearAuth0Cookies();
```

Call `clearAuth0Cookies()` anywhere in a test. For example:

```js
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
```

### preserveAuth0CookiesOnce()

```js
cy.preserveAuth0CookiesOnce();
```

`preserveAuth0CookiesOnce()` preserves cookies through multiple tests. It's best
used in the `beforeEach` hook. For example:

```js
context('Cookie', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.preserveAuth0CookiesOnce();
  });

  it('user login should preserve cookies', () => {
    cy.visit('/');

    cy.request('/api/auth/me').then(({ body: user }) => {
      expect(user.email).to.equal(Cypress.env('auth0Username'));
    });
  });

  it('user should be logged in still', () => {
    cy.visit('/');

    cy.get('[data-test="user-email"]').should(e =>
      expect(e).to.contain(Cypress.env('auth0Username')),
    );
  });
});
```

### Preserving Cookies

`cypress-nextjs-auth0` automatically preserves cookies between tests.

### Security considerations

#### Use separate tenants

[Auth0 recommends you use a separate tenant for each environment](https://auth0.com/docs/dev-lifecycle/setting-up-env)
(e.g. `development`, `testing`, `production`, etc). This will help mitigate the
risk of creating test users.

Therefore, if you don't have a dedicated tenant for your `testing` environment,
it's recommended you create a new tenant and update its setting to match your
`development` environment before following
[the installation steps](#installation).

#### Storing credentials

Put test credentials in `cypress.env.json` or a similar place (e.g. `.env`) that
you can keep out of source control.

If you use one of those, add the file to your `.gitignore` and `.npmignore`
files as follows:

```sh
# .gitignore

.env
cypress.env.json
```

#### Continuous integration

If you use a platform for some of all of CI, like
[GitHub Actions](https://github.com/features/actions), you will need to keep any
sensitive data outside your test logs.

For
[more info on how to prevent 'leaky' logs, see here](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

## Contributing

To contribute to this addon, clone the repo:

```sh
git clone https://github.com/sir-dunxalot/cypress-nextjs-auth0.git
```

Install dependencies:

```sh
yarn install
```

Run the dummy app server:

```sh
yarn dev
```

Finally, run the test suite (while the dummy app server is running):

```sh
yarn test:ui # or yarn test:headless for no UI
```

To run the test suites locally you will need to pass some environment variables
to Next.js and Cypress...

The easiest way to do this is to add the following two files (they're excluded
from source control):

- `.env`
- `cypress/dummy/.env`

To get values for these environment variables you can:

- Open an PR and then ask @sir-dunxalot to share test credentials
- Use values from your own Auth0 test tenant and app (since these files are not
  check in to source control)
- Create a new (free tier) tenant and application in Auth0 and set it up as
  documented in [the installation steps](#installation)

If you use your own Auth0 tenant, notice that you need two test users (for
`AUTH0_USERNAME` and `AUTH0_USERNAMEALT`).

Here are the Cypress environment variables (e.g. in `.env`):

```sh
# .env

# Auth0 Settings
AUTH0_AUDIENCE="https://lyft.auth0.com/api/v2/",
AUTH0_DOMAIN="lyft.auth0.com",
AUTH0_CLIENT_ID="FNfof292fnNFwveldfg9222rf",
AUTH0_CLIENT_SECRET="FNo3i9f2fbFOdFH8f2fhsooi496bw4uGDif3oDd9fmsS18dDn",
AUTH0_SECRET="DB208FHFQJFNNA28F0N1F8SBNF8B20FBA0BXSD29SSJAGSL12D9922929D",
AUTH0_SCOPE="openid profile email",
AUTH0_SESSION_COOKIE_NAME="appSession",

# cypress-nextjs-auth0 settings
AUTH0_LOGOUT_URL="/api/auth/logout"
AUTH0_RETURN_TO_URL="/"

# Cookie Settings
AUTH0_COOKIE_PATH=
AUTH0_COOKIE_HTTP_ONLY=
AUTH0_COOKIE_SAME_SITE=
AUTH0_COOKIE_SECURE=
AUTH0_COOKIE_TRANSIENT=

# Test Case Settings
AUTH0_USERNAME="testuser@lyft.com",
AUTH0_PASSWORD="mysupersecurepassword",
AUTH0_USERNAMEALT="testuser@lyft.com"
AUTH0_PASSWORDALT="anothersupersecurepassword",
```

Here are the Next.js app variables (e.g. in `cypress/dummy/.env`).

```sh
# cypress/dummy/.env

AUTH0_CLIENT_SECRET="FNo3i9f2fbFOdFH8f2fhsooi496bw4uGDif3oDd9fmsS18dDn"
AUTH0_SECRET="DB208FHFQJFNNA28F0N1F8SBNF8B20FBA0BXSD29SSJAGSL12D9922929D"

AUTH0_CLIENT_ID="FNfof292fnNFwveldfg9222rf"
AUTH0_AUDIENCE="https://lyft.auth0.com/api/v2/"
AUTH0_SCOPE="openid profile email"
AUTH0_ISSUER_BASE_URL="https://lyft.auth0.com"
AUTH0_BASE_URL="http://localhost:3000"
```

When you open a PR or push to a branch of this repo, GitHub Actions will run
tests. You don't need to worry about adding environment variables since they've
been added as
[Repository Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
already.

## Releasing

Project collaborators will build the project and release it using the
`yarn release` command, which passes any params to
[the release-it package](https://github.com/release-it/release-it/).

For example:

```sh
yarn release patch # e.g. 1.0.0 --> 1.0.1
yarn release minor # e.g. 1.0.0 --> 1.1.0
yarn release major # e.g. 1.0.0 --> 2.0.0
yarn release 1.2.4 # e.g. 1.0.0 --> 1.2.4
```
