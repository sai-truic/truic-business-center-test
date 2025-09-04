import React, { useState, useEffect } from 'react';
import { Accordion } from './ui/accordion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { courseData } from './SmallBusinessCourseComponents/CourseData';
import ChapterAccordion from './SmallBusinessCourseComponents/ChapterAccordion';

const SmallBusinessCourse = () => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const toggleLessonCompletion = (chapterIndex, lessonIndex) => {
    setCompletedLessons(prev => {
      const key = `${chapterIndex}-${lessonIndex}`;
      const newCompletedLessons = { ...prev, [key]: !prev[key] };
      return newCompletedLessons;
    });
  };

  const calculateProgress = (chapter, chapterIndex) => {
    const totalLessons = chapter.lessons.length;
    if (totalLessons === 0) return 0;
    const completedCount = chapter.lessons.filter((_, lessonIndex) => 
      completedLessons[`${chapterIndex}-${lessonIndex}`]
    ).length;
    return (completedCount / totalLessons) * 100;
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <AcademicCapIcon className="inline me-3 text-white" width="40" height="40"></AcademicCapIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            Small Business Startup Course
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Our Startup Guide will walk you through business formation from idea to launch.
        </p>
        <p className='text-lg'>
          After over a decade of helping people start and grow their businesses, we have developed a comprehensive program that will guide you through the ins and outs of launching and growing your own business.
        </p>
      </div>

      {/* Main section */}
      <div className="relative z-10">
        <Accordion type="multiple" className="space-y-4">
          {courseData.map((chapter, chapterIndex) => (
            <ChapterAccordion
              key={chapterIndex}
              chapter={chapter}
              chapterIndex={chapterIndex}
              completedLessons={completedLessons}
              toggleLessonCompletion={toggleLessonCompletion}
              calculateProgress={calculateProgress}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SmallBusinessCourse;
