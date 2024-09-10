import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Access Denied</h1>
        <p className="mt-4">You do not have access to this page.</p>
        <Link to="/" className="mt-4 text-blue-500 underline">Go back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
