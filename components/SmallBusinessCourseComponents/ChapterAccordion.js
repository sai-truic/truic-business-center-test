import React, { useState, useMemo } from 'react';
import { ChevronDownIcon, DocumentArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import LessonAccordion from './LessonAccordion';
import { getChapterIcon } from './utils';

const ChapterAccordion = ({ chapter, chapterIndex, completedLessons, toggleLessonCompletion }) => {
  const ChapterIcon = getChapterIcon(chapterIndex);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChapter = () => {
    setIsOpen(!isOpen);
  };

  const completedLessonsCount = useMemo(() => {
    return chapter.lessons.filter((_, lessonIndex) => 
      completedLessons[`${chapterIndex}-${lessonIndex}`]
    ).length;
  }, [chapter.lessons, chapterIndex, completedLessons]);

  const progressPercentage = chapter.lessons.length > 0 ? (completedLessonsCount / chapter.lessons.length) * 100 : 0;
  const isChapterCompleted = chapter.lessons.length > 0 && completedLessonsCount === chapter.lessons.length;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden w-full transition-all duration-300 hover:shadow-xl border relative ${isChapterCompleted ? 'border-green-500' : 'border-gray-800'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(247,147,30,0.05),transparent_70%)]"></div>
      <div className="relative z-10">
        <div 
          className="w-full p-4 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:ring-opacity-50 cursor-pointer"
          onClick={toggleChapter}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-grow">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2 flex items-center">
                <ChapterIcon className={`w-6 h-6 mr-2 ${isChapterCompleted ? 'text-green-500' : 'text-[#F7931E]'}`} />
                {chapter.title}
                {isChapterCompleted && (
                  <CheckCircleIcon className="w-6 h-6 ml-2 text-green-500" />
                )}
              </h2>
              {chapter.lessons.length > 0 && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 lg:mb-0">
                    <div 
                      className={`h-2.5 rounded-full ${isChapterCompleted ? 'bg-green-500' : 'bg-[#F7931E]'}`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">
                    {completedLessonsCount} of {chapter.lessons.length} lessons completed
                  </p>
                </>
              )}
            </div>
            <button className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#F7931E] to-orange-600 text-white text-sm font-medium rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg mt-4 lg:mt-0 transform hover:scale-105">
              <span>{isOpen ? 'Close Chapter' : 'View Chapter'}</span>
              <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4 sm:p-6 bg-white border-t border-gray-800">
            <LessonAccordion 
              lessons={chapter.lessons} 
              chapterIndex={chapterIndex} 
              completedLessons={completedLessons} 
              toggleLessonCompletion={toggleLessonCompletion} 
            />
            {chapter.downloads && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <h4 className="font-semibold text-lg text-neutral-950 mb-3 text-center">Downloads</h4>
                <div className={`grid ${chapter.downloads.length <= 2 ? 'justify-center' : ''} gap-4`} 
                     style={{
                       gridTemplateColumns: `repeat(auto-fit, minmax(${Math.min(300, Math.max(...chapter.downloads.map(d => d.title.length * 8 + 60)))}px, 1fr))`
                     }}>
                  {chapter.downloads.map((download, downloadIndex) => (
                    <a
                      key={downloadIndex}
                      href={download.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#F7931E] to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <DocumentArrowDownIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">{download.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterAccordion;
