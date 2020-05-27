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

      <p>User ID: {user?.sub}</p>
    </div>
  );
};

export default Page;
