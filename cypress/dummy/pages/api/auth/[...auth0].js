import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';

const getReturnTo = req => {
  const { returnTo } = req.query;
  return typeof returnTo === 'string' ? returnTo : undefined;
};

export default handleAuth({
  async logout(req, res) {
    try {
      await handleLogout(req, res, {
        returnTo: getReturnTo(req),
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(error.status || 400).end(error.message);
      }
    }
  },
});
