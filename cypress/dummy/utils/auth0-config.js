if (typeof window === 'undefined') {

  /* Settings exposed to the server. */

  module.exports = {
    clientId: process.env.auth0ClientID,
    clientSecret: process.env.auth0ClientSecret,
    scope: process.env.auth0Scope,
    domain: process.env.auth0Domain,
    redirectUri: process.env.auth0RedirectURI,
    postLogoutRedirectUri: process.env.auth0PostLogoutRedirectURI,
    session: {
      cookieSecret: process.env.auth0CookieSecret,
      cookieLifetime: process.env.auth0CookieLifetime,
      storeIdToken: process.env.auth0StoreIdToken,
      storeRefreshToken: process.env.auth0StoreRefreshToken,
      storeAccessToken: process.env.auth0StoreAccessToken,
    },
  };
} else {

  /* Settings exposed to the client. */

  module.exports = {
    clientId: process.env.auth0ClientID,
    scope: process.env.auth0Scope,
    domain: process.env.auth0Domain,
    redirectUri: process.env.auth0RedirectURI,
    postLogoutRedirectUri: process.env.auth0PostLogoutRedirectURI,
    session: {
      storeIdToken: process.env.auth0StoreIdToken,
      storeRefreshToken: process.env.auth0StoreRefreshToken,
      storeAccessToken: process.env.auth0StoreAccessToken,
    },
  };
}
