import React, { useState } from 'react';

const SmallBusinessRoadmap = () => {
  const [progress, setProgress] = useState(66); // This should be dynamic based on actual progress

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">Small Business Roadmap</span>
          <span className="text-sm font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-4">
          <ul>
            <li className="flex items-center mb-1">
              <input type="checkbox" checked className="w-4 h-4 mr-2" readOnly />
              <span>Forming Your LLC</span>
            </li>
            <li className="flex items-center mb-1">
              <input type="checkbox" className="w-4 h-4 mr-2" readOnly />
              <span>Post-Formation To Dos</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" readOnly />
              <span>Staying Compliant</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SmallBusinessRoadmap;