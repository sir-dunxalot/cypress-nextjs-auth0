import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const Page = props => {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}

      <dl>
        <dd>User ID</dd>
        <dt data-test="user-sub">{user?.sub}</dt>

        <dd>User email</dd>
        <dt data-test="user-email">{user?.email}</dt>
      </dl>
    </div>
  );
};

export default Page;
