import React, { useState } from 'react';
import Head from 'next/head';
import { FaDownload } from 'react-icons/fa'; // make sure to install react-icons using npm or yarn
import AccordionItem from '../Sidebar/Accordian';
import NameYourBusiness from '../SmallBusinessJourney/NameYourBusiness';
import GetARegisteredAgent from '../SmallBusinessJourney/GetARegisteredAgent';
import FileWithTheState from '../SmallBusinessJourney/FileWithTheState';
import CreateAnOperatingAgreement from '../SmallBusinessJourney/CreateAnOperatingAgreement';
import GetAnEINSection from '../SmallBusinessJourney/GetAnEINSection';

// The main component that uses the AccordionItem
const LLCFormation = () => {
  // You would dynamically update this progress value in a real application
  const progress = 66;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-12">
      <Head>
        <title>Small Business Journey</title>
      </Head>
      <div className="bg-white p-8 rounded shadow-lg w-full mb-12">
        <h1 className="text-xl font-semibold mb-2">SMALL BUSINESS JOURNEY</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center mt-2 mb-4">
          <span className="text-sm font-semibold text-gray-700">{progress}%</span>
          <button className="flex items-center bg-gray-200 text-sm rounded px-2 py-1 hover:bg-gray-300">
            <FaDownload className="text-lg mr-1" />
            LLC Roadmap PDF
          </button>
        </div>
        <p>Ready to formalize your business? An LLC is the most popular option and offers personal liability protection and tax benefits. You can do a lot of these tasks yourself or save time and hassle and <a href="#" className="text-blue-600 hover:underline">hire a professional service</a> to do the bulk of the work for you. Work on the items below and click the checkmark when you&apos;ve completed a step.</p>
      </div>
      <AccordionItem title="Select a State to Form In">
        {/* Replace this div with the actual content */}
        <div>
          To start a business as a Michigan LLC, you&apos;ll need to complete and file
          the Articles of Organization with the Michigan Corporations Division, which
          costs $50. You can apply online, in person, or by mail.
          {/* Add more content here */}
        </div>
      </AccordionItem>
      <AccordionItem title="Name Your Business">
        {/* Add content for naming your business */}
        <NameYourBusiness />
      </AccordionItem>
      <AccordionItem title="Get a Registered Agent">
        {/* Add content for getting a registered agent */}
        <GetARegisteredAgent />
      </AccordionItem>
      <AccordionItem title="File with the State">
        {/*Add content for filind with the state*/}
        <FileWithTheState />
      </AccordionItem>
      <AccordionItem title="Create an Operating Agreement">
        {/*Add content for creating an operating agreement*/}
        <CreateAnOperatingAgreement />
      </AccordionItem>
      <AccordionItem title="Get an EIN">
        {/*Add content for getting an EIN*/}
        <GetAnEINSection />
      </AccordionItem>
    </div>
  );
};

export default LLCFormation;