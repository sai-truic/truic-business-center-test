import React from 'react';

const CourseProgressCard = () => {
  // Replace this with your actual logic to determine the progress
  const progress = 16; // This value should be dynamic based on actual progress

  return (
    <div className="max-w-md bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl bottom">
      <div className="md:flex">
        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Small Business Startup Course</div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            Chapter 1: Lesson 5
          </div>
          <p className="mt-2 text-gray-500">
            10-Step Guide on How to Do Market Research & Business Planning
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm font-semibold">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;