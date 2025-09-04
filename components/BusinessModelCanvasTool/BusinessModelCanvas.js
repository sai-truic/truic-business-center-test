import React, { useState } from 'react';
import { useCache } from './../../hooks/useCache';
import useInputState from './../useInputState';
import {
  LinkIcon,
  CheckIcon,
  GiftIcon,
  HeartIcon,
  BuildingOfficeIcon,
  TruckIcon,
  UsersIcon,
  TagIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg md:max-w-3/4 lg:w-3/4 h-full max-h-full md:h-3/4 flex flex-col">
        {children}
      </div>
    </div>
  );
};

const Toast = ({ message, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
};

const CanvasSection = ({ title, Icon, gridArea, color, contents, updateContents }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addContent = () => {
    setEditingIndex(null);
    setCurrentTitle('');
    setCurrentContent('');
    setIsEditing(true);
    setModalOpen(true);
  };

  const editContent = (index) => {
    setEditingIndex(index);
    setCurrentTitle(contents[index].name);
    setCurrentContent(contents[index].text);
    setIsEditing(true);
    setModalOpen(true);
  };

  const deleteContent = (index) => {
    const newContents = contents.filter((_, i) => i !== index);
    updateContents(title, newContents);
  };

  const saveContent = () => {
    if (currentTitle.trim() === '') {
      setErrorMessage('Please enter a title before saving.');
      return;
    }

    const newContents = [...contents];
    if (editingIndex === null) {
      newContents.push({ name: currentTitle, text: currentContent });
    } else {
      newContents[editingIndex] = { name: currentTitle, text: currentContent };
    }
    updateContents(title, newContents);
    setErrorMessage('');
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
    setIsEditing(false);
    setCurrentTitle('');
    setCurrentContent('');
    setErrorMessage('');
  };

  return (
    <div className={`${gridArea} bg-white rounded-lg shadow transition-all duration-300 hover:shadow-lg flex flex-col`}>
      <div className={`flex items-center justify-between p-4 ${color} rounded-t-lg`}>
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <button onClick={addContent} className="p-1 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200">
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {contents.map((content, index) => (
          <div key={index} className="mb-2 relative group">
            <div className="w-full p-2 text-sm border rounded group-hover:bg-gray-50 transition-colors duration-200">
              {content.name}
            </div>
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button onClick={() => editContent(index)} className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <PencilIcon className="w-4 h-4 text-blue-500" />
              </button>
              <button onClick={() => deleteContent(index)} className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <TrashIcon className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-auto p-6">
            <input
              type="text"
              className="w-full p-2 text-lg border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              placeholder="Enter title..."
            />
            {errorMessage && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            <ReactQuill
              theme="snow"
              value={currentContent}
              onChange={setCurrentContent}
              className="h-64"
            />
          </div>
          <div className="flex justify-end p-6 border-t bg-gray-50">
            <button
              onClick={saveContent}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const BusinessModelCanvas = () => {
  const { userId } = useInputState();
  const cacheKey = `${userId}-business_canvas`;
  const { fetchFromCache, setToCache, invalidateCache } = useCache();

  const { data: canvasData, isLoading, error, refetch } = fetchFromCache(cacheKey);
  const { saveToCache, isSaving, saveError } = setToCache(cacheKey);

  const [toastVisible, setToastVisible] = useState(false);
  const [loadTime, setLoadTime] = useState(null);

  React.useEffect(() => {
    const startTime = performance.now();
    refetch().then(() => {
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
    });
  }, [refetch]);

  const updateContents = (section, newContents) => {
    const updatedData = {
      ...canvasData,
      [section]: newContents,
    };
    saveToCache(updatedData);
    setToastVisible(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const sections = [
    { title: 'Key Partners', Icon: LinkIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-2', color: 'bg-blue-100' },
    { title: 'Key Activities', Icon: CheckIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-1', color: 'bg-green-100' },
    { title: 'Value Propositions', Icon: GiftIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-2', color: 'bg-red-100' },
    { title: 'Customer Relationships', Icon: HeartIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-1', color: 'bg-purple-100' },
    { title: 'Key Resources', Icon: BuildingOfficeIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-1', color: 'bg-yellow-100' },
    { title: 'Channels', Icon: TruckIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-3', color: 'bg-indigo-100' },
    { title: 'Customer Segments', Icon: UsersIcon, gridArea: 'col-span-4 sm:col-span-2 md:col-span-1 row-span-2', color: 'bg-pink-100' },
    { title: 'Cost Structure', Icon: TagIcon, gridArea: 'col-span-4 sm:col-span-4 md:col-span-2 row-span-1', color: 'bg-gray-200' },
    { title: 'Revenue Streams', Icon: CurrencyDollarIcon, gridArea: 'col-span-4 sm:col-span-4 md:col-span-2 row-span-1', color: 'bg-green-100' },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-100">
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800 mr-4">Business Model Canvas</h1>
          {loadTime !== null && (
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>Load time: {loadTime.toFixed(2)} ms</span>
            </div>
          )}
        </div>
        <button
          onClick={() => invalidateCache(cacheKey)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Refresh Canvas
        </button>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 min-h-full">
          {sections.map((section) => (
            <CanvasSection
              key={section.title}
              title={section.title}
              Icon={section.Icon}
              gridArea={section.gridArea}
              color={section.color}
              contents={canvasData?.[section.title] || []}
              updateContents={updateContents}
            />
          ))}
        </div>
      </div>
      <>
        {isSaving && <div className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">Saving...</div>}
        {saveError && <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">Error saving: {saveError.message}</div>}
        <Toast message="Canvas updated successfully!" isVisible={toastVisible} onClose={() => setToastVisible(false)} />
      </>
    </div>
  );
};

export default BusinessModelCanvas;
