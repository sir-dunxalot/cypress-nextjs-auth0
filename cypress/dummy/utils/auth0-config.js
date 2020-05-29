if (typeof window === 'undefined') {

  /* Settings exposed to the server. */

  module.exports = {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    redirectUri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_AUTH0_POST_LOGOUT_REDIRECT_URI,
    session: {
      cookieSecret: process.env.AUTH0_COOKIE_SECRET,
      cookieLifetime: process.env.NEXT_PUBLIC_AUTH0_COOKIE_LIFETIME,
      storeIdToken: process.env.NEXT_PUBLIC_AUTH0_STORE_ID_TOKEN,
      storeRefreshToken: process.env.NEXT_PUBLIC_AUTH0_STORE_REFRESH_TOKEN,
      storeAccessToken: process.env.NEXT_PUBLIC_AUTH0_STORE_ACCESS_TOKEN,
    },
  };
} else {

  /* Settings exposed to the client. */

  module.exports = {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    redirectUri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_AUTH0_POST_LOGOUT_REDIRECT_URI,
    session: {
      storeIdToken: process.env.NEXT_PUBLIC_AUTH0_STORE_ID_TOKEN,
      storeRefreshToken: process.env.NEXT_PUBLIC_AUTH0_STORE_REFRESH_TOKEN,
      storeAccessToken: process.env.NEXT_PUBLIC_AUTH0_STORE_ACCESS_TOKEN,
    },
  };
}
