import auth0 from '../../utils/auth0';

/* Not authenticated so we can use this endpoint to check auth status */

export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res, {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
