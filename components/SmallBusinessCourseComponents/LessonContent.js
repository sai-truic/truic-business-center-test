import React from 'react';
import { BookOpenIcon, LightBulbIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const LessonContent = ({ lesson, currentPage, totalPages, onNextPage, onPrevPage }) => {
  const renderContent = (item, contentIndex) => (
    <div key={contentIndex} className="mb-6">
      {item.type === "text" && (
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{item.content}</p>
      )}
      {item.type === "list" && (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-lg p-6 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(247,147,30,0.1),transparent_70%)]"></div>
          <div className="relative z-10">
            <h4 className="font-semibold text-lg text-[#F7931E] mb-4 flex items-center">
              <LightBulbIcon className="w-6 h-6 mr-3 text-[#F7931E]" />
              {item.title}
            </h4>
            <ul className="grid grid-cols-1 gap-3 text-sm sm:text-base text-neutral-700">
              {item.items.map((listItem, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {item.type === "flex" && (
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="xl:w-1/2 flex">
            {item.items[0].type === "list" && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-lg p-6 shadow-sm flex-grow flex flex-col justify-between relative overflow-hidden" style={{ minHeight: '400px' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(247,147,30,0.1),transparent_70%)]"></div>
                <div className="relative z-10">
                  <h4 className="font-semibold text-lg text-[#F7931E] mb-4 flex items-center">
                    <LightBulbIcon className="w-6 h-6 mr-3 text-[#F7931E]" />
                    {item.items[0].title}
                  </h4>
                  <ul className="grid grid-cols-1 gap-3 text-sm sm:text-base text-neutral-700">
                    {item.items[0].items.map((listItem, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 relative z-10"></div>
              </div>
            )}
          </div>
          <div className="xl:w-1/2 flex items-center justify-center">
            {item.items[1].type === "video" && (
              <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height: '200px' }}>
                <iframe
                  src={item.items[1].url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 py-6 bg-white rounded-xl shadow-lg border border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(247,147,30,0.05),transparent_70%)]"></div>
      <div className="relative z-10">
        {lesson.content && lesson.content.length > 0 ? (
          <>
            {renderContent(lesson.content[currentPage - 1], currentPage - 1)}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-4 py-2 ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#F7931E] to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                } rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
              >
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Previous
              </button>
              <span className="text-sm text-neutral-600">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-4 py-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#F7931E] to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                } rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
              >
                Next
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm sm:text-base text-neutral-600 italic">No detailed content available for this lesson.</p>
        )}
      </div>
    </div>
  );
};

export default LessonContent;
