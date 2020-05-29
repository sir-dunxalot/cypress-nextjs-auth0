import React from 'react';
import { useFetchUser } from '../utils/user';

const Page = (props) => {
  const { loading, user } = useFetchUser();

  return (
    <div>
      {user ? (
        <a href="/api/logout">Logout</a>
      ) : (
        <a href="/api/login">Login</a>
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
