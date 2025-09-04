import React from 'react';
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-8">Please sign in to access your Business Center Dashboard</p>
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
};

export default LoginPage;
