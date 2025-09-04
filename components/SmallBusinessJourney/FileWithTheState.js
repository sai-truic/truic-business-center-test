import React from 'react';
import Head from 'next/head';

const FileWithTheState = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Michigan LLC Registration</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-lg w-full">
        <h2 className="text-xl font-bold mb-4">Start your Michigan LLC</h2>
        <p>To start a business as a Michigan LLC, you&apos;ll need to complete and file the Articles of Organization with the Michigan Corporations Division.</p>
        
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Cost:</h3>
              <p>$50 (nonrefundable)</p>
              <p className="text-sm italic">Michigan offers a waiver of fees for veterans if they meet the right requirements*</p>
            </div>
            <div>
              <h3 className="font-semibold">Processing Time:</h3>
              <p>24 hours online / 3-5 business days by mail</p>
              <p className="text-sm italic">You can expedite your filing for an additional fee</p>
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
              <p className="font-medium text-gray-700">File Online</p>
              <a href="#" className="text-indigo-600 hover:underline">Fill out and submit Form 700 the LARA Corporations Online Filing System</a>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">Get Started</button>
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
              <p className="font-medium text-gray-700">File by Mail or in Person</p>
              <a href="#" className="text-indigo-600 hover:underline">Download Form 700: Articles of Organization</a>
              <div className="text-sm">
                <p>Mail to:</p>
                <p>Michigan Department of Licensing and Regulatory Affairs</p>
                <p>Corporations, Securities & Commercial Licensing Bureau —</p>
                <p>Corporations Division</p>
                <p>P.O. Box 30054</p>
                <p>Lansing, MI 48909</p>
                <p>Bring in person to:</p>
                <p>Michigan Department of Licensing and Regulatory Affairs</p>
                <p>2501 Woodlake Cir.</p>
                <p>Okemos, MI 48864</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">FAQ: Frequently asked questions about filing Michigan LLC documents.</a>
        </div>
      </div>
    </div>
  );
};

export default FileWithTheState;