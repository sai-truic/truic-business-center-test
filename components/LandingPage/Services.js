import React from 'react';
import { motion } from 'framer-motion';
import { courseData } from '../SmallBusinessCourseComponents/CourseData';

const CourseCard = ({ title, lessons, icon, isEven, upcomingChapters }) => {
    return (
        <motion.div
            className={`flex flex-col lg:flex-row items-stretch bg-gradient-to-br from-[#FEFAF7] via-[#F9F9F9] to-[#F4F4F4] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden hover:bg-gradient-to-br hover:from-[#F9F9F9] hover:via-[#F4F4F4] hover:to-[#FEFAF7] glossy-card border border-gray-200 ${isEven ? 'lg:flex-row-reverse' : ''}`}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <div className={`flex-1 ${isEven ? 'lg:pl-8' : 'lg:pr-8'} mb-6 lg:mb-0`}>
                <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-[#F4A262] to-[#E5700F] rounded-full p-3 w-14 h-14 flex items-center justify-center mr-4 relative z-10 shadow-md hover:shadow-lg transition-shadow duration-300">
                        {React.cloneElement(icon, { className: "w-8 h-8 text-[#FEFAF7]" })}
                    </div>
                    <h3 className="text-2xl font-bold text-[#38657A] relative z-10 border-b-2 border-[#38657A] pb-1 tracking-wide text-shadow-sm">{title}</h3>
                </div>
                <p className="text-[#595959] leading-relaxed relative z-10 mt-4 tracking-wide text-shadow-sm">
                    {lessons ? `${lessons.length} lessons` : ''}
                </p>
            </div>
            <div className="flex-1">
                {lessons && lessons.length > 0 ? (
                    <ul className="space-y-3">
                        {lessons.slice(0, 3).map((lesson, index) => (
                            <li key={index} className="flex items-start bg-white bg-opacity-50 p-3 rounded-lg shadow-sm">
                                <svg className="w-5 h-5 mr-3 text-[#F4A262] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-[#38657A] font-medium">{lesson.title}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    upcomingChapters && (
                        <ul className="space-y-3">
                            {upcomingChapters.map((chapter, index) => (
                                <li key={index} className="flex items-start bg-white bg-opacity-50 p-3 rounded-lg shadow-sm">
                                    <svg className="w-5 h-5 mr-3 text-[#F4A262] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-sm text-[#38657A] font-medium">{chapter.replace("(Coming Soon)","")}</span>
                                </li>
                            ))}
                        </ul>
                    )
                )}
                {lessons && lessons.length > 3 && (
                    <p className="mt-4 text-sm text-[#38657A] font-semibold">And {lessons.length - 3} more lessons...</p>
                )}
            </div>
        </motion.div>
    );
};

const SmallBusinessCourses = () => {
    const completedChapters = courseData.filter(chapter => chapter.lessons && chapter.lessons.length > 0);
    const emptyChapters = courseData.filter(chapter => !chapter.lessons || chapter.lessons.length === 0);

    return (
        <section aria-labelledby="courses-heading" className="mb-10 py-24 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-[#F4F4F4] relative overflow-hidden border border-white border-opacity-20">
            <motion.h2 
                id="courses-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 text-[#212429] relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Small Business Courses
            </motion.h2>
            <motion.p 
                className="text-xl sm:text-2xl text-center mb-12 text-[#595959] max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
            >
                Comprehensive courses to guide you through every stage of your <span className="text-[#38657A] font-semibold">business journey</span>, from planning to growth.
            </motion.p>
            <div className="space-y-12 max-w-6xl mx-auto px-6 relative z-10">
                {completedChapters.map((chapter, index) => (
                    <CourseCard 
                        key={index}
                        title={chapter.title}
                        lessons={chapter.lessons}
                        icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        isEven={index % 2 !== 0}
                    />
                ))}
                <CourseCard 
                    title="More Exciting Chapters"
                    upcomingChapters={emptyChapters.map(chapter => chapter.title)}
                    icon={<svg fill="white" viewBox="0 0 24 24" stroke="#000000"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                    isEven={completedChapters.length % 2 !== 0}
                />
            </div>
        </section>
    );
};

export default SmallBusinessCourses;
