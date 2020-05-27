import { initAuth0 } from '@auth0/nextjs-auth0';
import getCookies from 'next-cookies';
import auth0Config from './auth0-config';

export default initAuth0(auth0Config);
