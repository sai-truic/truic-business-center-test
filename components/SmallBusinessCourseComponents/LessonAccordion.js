import React, { useState } from 'react';
import { CheckCircleIcon, ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getLessonIcon } from './utils';

const LessonAccordion = ({ lessons, chapterIndex, completedLessons, toggleLessonCompletion }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  if (!currentLesson) {
    return <div>No lesson available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl shadow-xl w-full text-left items-center p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 font-medium bg-white text-neutral-600 hover:bg-gray-50 border border-gray-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(247,147,30,0.05),transparent_70%)]"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <button
              onClick={() => toggleLessonCompletion(chapterIndex, currentLessonIndex)}
              className="focus:outline-none"
            >
              {completedLessons[`${chapterIndex}-${currentLessonIndex}`] ? (
                <CheckCircleIcon className="w-6 h-6 text-white bg-green-500 rounded-full" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full group-hover:border-[#F7931E] transition-colors duration-200" />
              )}
            </button>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 flex items-center ml-3">
              {getLessonIcon(currentLesson.title)}
              <span className="ml-2">{currentLesson.title}</span>
            </h3>
          </div>
          <div className="mt-4">
            {currentLesson.content && currentLesson.content.map((contentItem, contentIndex) => (
              <div key={contentIndex} className="mb-4 last:mb-0">
                {contentItem.type === "text" && (
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {contentItem.content}
                  </p>
                )}
                {contentItem.type === "flex" && (
                  <div className="flex flex-col lg:flex-row gap-4">
                    {contentItem.items.map((flexItem, flexIndex) => (
                      <div key={flexIndex} className="flex-1 flex flex-col">
                        {flexItem.type === "list" && (
                          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-lg p-4 shadow-sm flex-grow flex flex-col justify-between h-full">
                            <div>
                              <h4 className="font-semibold text-lg text-[#F7931E] mb-2">{flexItem.title}</h4>
                              <ul className="list-disc list-inside">
                                {flexItem.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="text-sm sm:text-base text-neutral-700">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        {flexItem.type === "video" && (
                          <div className="w-full lg:h-full">
                            <iframe
                              src={flexItem.url}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full min-h-[280px] rounded-lg shadow-md"
                            ></iframe>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {currentLesson.url && (
              <div className="mt-4 flex justify-center">
                <a
                  href={currentLesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#F7931E] to-orange-600 text-white text-sm font-medium rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                  View Full Lesson
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
        <button
          onClick={handlePrevLesson}
          disabled={currentLessonIndex === 0}
          className={`flex items-center justify-center px-4 py-2 w-full sm:w-auto ${
            currentLessonIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#F7931E] to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
          } rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Previous Lesson</span>
          <span className="sm:hidden">Previous</span>
        </button>
        <span className="text-sm text-neutral-600 order-first sm:order-none w-full sm:w-auto text-center">
          {currentLessonIndex + 1} / {lessons.length}
        </span>
        <button
          onClick={handleNextLesson}
          disabled={currentLessonIndex === lessons.length - 1}
          className={`flex items-center justify-center px-4 py-2 w-full sm:w-auto ${
            currentLessonIndex === lessons.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#F7931E] to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
          } rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default LessonAccordion;
