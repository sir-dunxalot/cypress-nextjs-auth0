import auth0 from '../../utils/auth0';

function route(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'John Doe' }));
}

export default auth0.requireAuthentication(route);
