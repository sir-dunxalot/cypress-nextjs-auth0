/**
 * Default logout URL if you use nextjs-auth0's `handleAuth` in
 * pages/api/[...auth0].ts
 *
 * Docs
 * @see https://auth0.github.io/nextjs-auth0/modules/handlers_auth.html
 * @see https://auth0.github.io/nextjs-auth0/modules/handlers_logout.html
 */
const DEFAULT_LOGOUT_URL = '/api/auth/logout';

Cypress.Commands.add('logout', returnTo => {
  /**
   * nextjs-auth0's logout URL supports redirecting to a custom `returnTo` URL.
   * cy.logout supports that and will create a logout URL that either uses the
   * current hostname or the `returnTo` URLs one.
   *
   * @see https://auth0.github.io/nextjs-auth0/interfaces/handlers_logout.logoutoptions.html
   */
  const preparedLogoutUrl = new URL(
    Cypress.env('auth0LogoutUrl') || DEFAULT_LOGOUT_URL,
    window.location.href,
  );

  const preparedReturnTo = returnTo || Cypress.env('auth0ReturnToUrl');
  if (preparedReturnTo) {
    preparedLogoutUrl.searchParams.set('returnTo', preparedReturnTo);
  }

  /**
   * Because we preserved cookies they might not be deleted by now. That is why
   * we force them to be deleted.
   *
   * TODO: needs further investigation if this is the way to go when handling
   * logouts in Cypress.
   */
  cy.clearAuth0Cookies();

  /**
   * default URL is the default URL that nextjs-auth0 defines and uses
   */
  cy.visit(preparedLogoutUrl.toString());
});
