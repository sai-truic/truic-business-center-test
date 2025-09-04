import React from 'react';
import Head from 'next/head';

const GetARegisteredAgent = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Register Agent Form</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-md w-full">
        <form>
          <label htmlFor="agent-name" className="block text-lg font-medium text-gray-700">
            Enter registered agent name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="agent-name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Registered agent name"
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
          <p className="text-md text-gray-700">You are <span className="font-semibold">required</span> to appoint and maintain a resident agent for your Michigan LLC. A resident agent is more commonly known as a registered agent in other states.</p>
          <div className="mt-4 p-4 border-l-4 border-green-500 bg-green-100">
            <h3 className="text-md font-semibold">Exclusive Discount: Northwest Registered Agent</h3>
            <p className="text-sm mt-1">We highly recommend using Northwest Registered Agent. For only $29+ state fees they will do all the heavy lifting of forming your LLC and serve as your registered agent for the first year for free!</p>
          </div>
          <div className="mt-4">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">FAQ: Frequently asked questions about getting a resident agent</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetARegisteredAgent;