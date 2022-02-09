require('dotenv').config()

const encrypt = require('../../encrypt');

module.exports = (on, config) => {
  on('task', { encrypt });

  return {
    ...config,
    env: {
      ...config.env,
      auth0Audience: process.env.AUTH0_AUDIENCE,
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
      auth0CookieSecret: process.env.AUTH0_SECRET,
      auth0Password: process.env.AUTH0_PASSWORD,
      auth0Scope: process.env.AUTH0_SCOPE,
      auth0SessionCookieName: process.env.AUTH0_SESSION_COOKIE_NAME,
      auth0Username: process.env.AUTH0_USERNAME,
      auth0UsernameAlt: process.env.AUTH0_USERNAMEALT,
      auth0PasswordAlt: process.env.AUTH0_PASSWORDALT,
    },
    video: false,
    watchForFileChanges: false
  }
}
