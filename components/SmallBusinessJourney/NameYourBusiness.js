import React from 'react';
import Head from 'next/head';

const NameYourBusiness = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Business Name Generator</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-md w-full">
        <form>
          <label htmlFor="business-name" className="block text-lg font-medium text-gray-700">
            Enter your business name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="business-name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Your business name"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
            </button>
          </div>
        </form>
        <div className="mt-6">
          <h3 className="text-md font-semibold">Things to Consider:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>The name of your LLC should be distinguishable from other business names in your state and must meet the state’s naming guidelines.</li>
            <li>Review the naming guidelines</li>
            <li>Make sure your business name is available</li>
            <li>Is the URL available? For branding purposes, we recommend that you check to see if your business name is available as a web domain.</li>
          </ul>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameYourBusiness;