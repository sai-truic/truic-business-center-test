import React from 'react';
import Head from 'next/head';

const CreateAnOperatingAgreement = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>LLC Operating Agreement</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-lg w-full">
        <p className="text-md text-gray-700 mb-2">
          An operating agreement is <span className="font-bold text-red-600">not required</span> for an LLC in Michigan, but it&apos;s a
          good practice to have one.
        </p>
        <p className="text-md text-gray-700 mb-4">
          An operating agreement is a legal document outlining the ownership and
          operating procedures of an LLC. It helps ensure that all business owners
          are on the same page and reduces the risk of future conflict.
        </p>
        <p className="text-md text-gray-700 mb-4">
          Create one with our <a href="#" className="text-indigo-600 hover:underline">free template</a> or our <a href="#" className="text-indigo-600 hover:underline">Operating Agreement Tool</a>.
        </p>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">FAQ: Frequently asked questions about operating agreements.</a>
      </div>
    </div>
  );
};

export default CreateAnOperatingAgreement;