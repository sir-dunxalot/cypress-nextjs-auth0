require('dotenv').config();

const encrypt = require('../../encrypt');

module.exports = (on, config) => {
  on('task', { encrypt });

  return {
    ...config,
    env: {
      ...config.env,
      // Auth0 Settings
      auth0Audience: process.env.AUTH0_AUDIENCE,
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
      auth0CookieSecret: process.env.AUTH0_SECRET,
      auth0Password: process.env.AUTH0_PASSWORD,
      auth0Scope: process.env.AUTH0_SCOPE,
      auth0SessionCookieName: process.env.AUTH0_SESSION_COOKIE_NAME,
      // cypress-nextjs-auth0 settings
      auth0LogoutUrl: process.env.AUTH0_LOGOUT_URL,
      auth0ReturnToUrl: process.env.AUTH0_RETURN_TO_URL,
      // Cookie Settings
      auth0CookiePath: process.env.AUTH0_COOKIE_PATH || '/',
      auth0CookieHttpOnly: process.env.AUTH0_COOKIE_HTTP_ONLY,
      auth0CookieCookieSameSite: process.env.AUTH0_COOKIE_SAME_SITE,
      auth0CookieCookieSecure: process.env.AUTH0_COOKIE_SECURE,
      auth0CookieTransient: process.env.AUTH0_COOKIE_TRANSIENT,
      // Test Case Settings
      auth0Username: process.env.AUTH0_USERNAME,
      auth0UsernameAlt: process.env.AUTH0_USERNAMEALT,
      auth0PasswordAlt: process.env.AUTH0_PASSWORDALT,
    },
    video: false,
    watchForFileChanges: false,
  };
};
