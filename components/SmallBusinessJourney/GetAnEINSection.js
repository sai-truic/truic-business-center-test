import React from 'react';
import Head from 'next/head';

const GetAnEINSection = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Request EIN</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-lg w-full">
        <p>An Employer Identification Number (EIN) is used by the IRS to identify a business entity and keep track of a business’s tax reporting. It is essentially a Social Security number (SSN) for the company.</p>
        <p className="mt-2">An EIN is also needed if you plan on opening a business bank account or hiring employees.</p>

        <div className="mt-4">
          <h3 className="font-semibold">Cost:</h3>
          <p>Free</p>
        </div>

        <div className="mt-6">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0">
              <span className="text-green-500">
                {/* Checkmark icon */}
                ✓
              </span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">Request an EIN online</p>
              <p>After you’ve formed your company you can request an EIN from the IRS online</p>
              <button className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">Get an EIN</button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0">
              <span className="text-green-500">
                {/* Checkmark icon */}
                ✓
              </span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">Apply by mail or fax</p>
              <a href="#" className="text-indigo-600 hover:underline">Download Form SS-4</a>
              <p className="mt-1">Mail to:</p>
              <address className="not-italic">
                Internal Revenue Service<br />
                Attn: EIN Operation<br />
                Cincinnati, OH 45999
              </address>
              <p className="mt-1">Fax to: (855) 641-6935</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">FAQ: Frequently asked questions about getting an EIN</a>
        </div>
      </div>
    </div>
  );
};

export default GetAnEINSection;