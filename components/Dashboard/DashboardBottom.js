import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Headphones, Clock, ExternalLink, Wrench, FileText, Type, Grid, Clipboard, X, ScrollText } from 'lucide-react';
import * as HeroIconsOutline from '@heroicons/react/24/outline';
// import { NewspaperIcon, AcademicCapIcon, DocumentIcon, StarIcon, BuildingStorefrontIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const videosAndPodcasts = [
  { id: 1, type: 'video', time: '07:28', title: 'What is an LLC ? - Limited Liability Company', link: 'https://www.youtube.com/watch?v=bnAQ8MTxKhY' },
  { id: 2, type: 'video', time: '08:02', title: 'S Corp vs LLC (Should you choose an S-Corp status?)', link: 'https://www.youtube.com/watch?v=PYGZ8c0yJDk' },
  { id: 3, type: 'video', time: '13:13', title: 'The Best LLC Services Compared', link: 'https://www.youtube.com/watch?v=Jy981mYmFrMM' },
  { id: 4, type: 'video', time: '07:28', title: 'The Business of Brand', link: 'https://www.youtube.com/watch?v=7oWNhS22F4U' },
  { id: 5, type: 'video', time: '07:41', title: 'The Brothers That Copied Their Way to Billions', link: 'https://www.youtube.com/watch?v=PcYQk7zC01g' },
  { id: 6, type: 'video', time: '14:30', title: 'The High-Tech Strawberry', link: 'https://www.youtube.com/watch?v=_p2z3Uewon0' },
];

const popularTools = [
  { id: 1, title: 'Operating Agreement', link: 'OperatingAgreement', icon: 'NewspaperIcon' },
  { id: 2, title: 'Business Plan Generator', link: 'BusinessPlanGenerator', icon: 'BriefcaseIcon' },
  { id: 3, title: 'Recommended Services', link: 'RecommendedServices', icon: 'StarIcon' },
  { id: 4, title: 'Free Legal Forms', link: 'Documents', icon: 'DocumentIcon' },
  { id: 5, title: 'Small Business Course', link: 'SmallBusinessCourse', icon: 'AcademicCapIcon' },
];

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const MediaCard = ({ id, type, time, title, link, isPlaying, onPlay }) => {
  const videoId = type === 'video' ? getYouTubeVideoId(link) : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;

  const handlePlay = () => {
    onPlay(id);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onPlay(null);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-1/2 lg:w-1/3 p-3"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 h-full flex flex-col">
        <div className="relative pt-[56.25%] bg-gray-200 flex-grow" onClick={handlePlay}>
          {isPlaying && videoId ? (
            <div className="absolute inset-0">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-50"></div>
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full z-20"
              >
                <X size={16} />
              </button>
            </div>
          ) : thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer" />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 cursor-pointer">
              {type === 'podcast' ? <Headphones size={48} className="text-indigo-400" /> : <Play size={48} className="text-indigo-400" />}
            </div>
          )}
          {!isPlaying && (
            <>
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                {type === 'video' ? <Play size={12} className="mr-1" /> : <Headphones size={12} className="mr-1" />}
                <span className="font-medium">{type === 'video' ? 'Video' : 'Podcast'}</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Clock size={12} className="mr-1" />
                {time}
              </div>
            </>
          )}
        </div>
        <div className="p-4 flex-shrink-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-200 line-clamp-2 mb-2"
          >
            {title}
          </a>
          <div className="flex justify-between items-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-truicDarkOrange hover:text-truicDarkOrange transition-colors duration-200 flex items-center"
            >
              <span className="mr-1 text-sm font-medium">Watch Now</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ToolCard = ({ title, link, icon, onNavigate }) => {
  const IconComponent = HeroIconsOutline[icon] || Wrench;

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(link);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-1/2 lg:w-1/4 p-2"
    >
      <a
        href="#"
        onClick={handleClick}
        className="border relative block bg-white rounded-xl p-6 text-center transition-all duration-300 h-full group hover:scale-[1.02] shadow-lg"
      >
        {/* Content wrapper with enhanced depth */}
        <div className="p-2">
          {/* Icon container with refined effects */}
          <div className="p-3 inline-block transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <IconComponent className="text-truicDarkOrange transition-all duration-300" width="34" height="34" />
          </div>
          
          {/* Text with enhanced contrast */}
          <h3 className="text-lg font-semibold text-neutral-950 group-hover:text-truicDarkOrange transition-all duration-300">
          {title}
        </h3>
        </div>
      </a>
    </motion.div>
  );
};

const DashboardBottom = ({ onNavigate }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const handlePlay = useCallback((id) => {
    setCurrentlyPlaying(id);
  }, []);

  return (
    <div className="main-content-panel-styling">
      <div className="absolute inset-0"></div>
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-neutral-950 relative">
        <span className="bg-clip-text text-neutral-950 bg-[#C6500C]">
          Entrepreneur Resource Center
        </span>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="mb-9 flex justify-self-center gap-3 text-2xl font-normal">
          Tools & Resources
        </h2>
        <div className="flex flex-wrap -mx-2">
          {popularTools.map(tool => (
            <ToolCard key={tool.id} title={tool.title} link={tool.link} icon={tool.icon} onNavigate={onNavigate} />
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="mb-9 text-2xl font-normal flex justify-self-center gap-3">
          Videos & Podcast Episodes
        </h2>
        <div className="flex flex-wrap -mx-2">
          {videosAndPodcasts.map(media => (
            <MediaCard 
              key={media.id} 
              id={media.id}
              type={media.type} 
              time={media.time} 
              title={media.title} 
              link={media.link} 
              isPlaying={currentlyPlaying === media.id}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardBottom;
