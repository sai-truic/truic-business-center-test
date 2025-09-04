import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CustomSelect = ({ value, onChange, options, ariaLabel }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none bg-transparent pr-8 pl-2 py-1 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
  </div>
);

export const CustomDatePicker = ({ className, selected, onSelect, minDate, maxDate }) => {
  const baseClasses = "border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50";
  const [date, setDate] = useState(selected ? new Date(selected) : new Date());
  const [currentDate, setCurrentDate] = useState(date);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (selected) {
      // console.log("Selected :", selected);
      let newDate;
      if (typeof selected === 'string') {
        const [year, month, day] = selected.split('-').map(Number);
        newDate = new Date(year, month - 1, day);
      } else if (selected instanceof Date) {
        newDate = new Date(selected);
      } else {
        console.error("Invalid selected date format");
        return;
      }
      console.log("New Date :", newDate);
      setDate(newDate);
      setCurrentDate(new Date(newDate));
    }
  }, [selected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
        setShowMonthPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (isDateInRange(newDate)) {
      setDate(newDate);
      onSelect(newDate.toISOString().split('T')[0]);
      setShowCalendar(false);
    }
  };

  const isPrevMonthDisabled = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth < new Date(2010, 0, 1);
  };

  const handlePrevMonth = () => {
    if (!isPrevMonthDisabled()) {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setMonth(newDate.getMonth() - 1);
        return newDate;
      });
    }
  };

  const isNextMonthDisabled = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const today = new Date();
    return nextMonth > today;
  };

  const handleNextMonth = () => {
    if (!isNextMonthDisabled()) {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setMonth(newDate.getMonth() + 1);
        return newDate;
      });
    }
  };

  const isDateInRange = (date) => {
    if (minDate && new Date(minDate) > date) return false;
    if (maxDate && new Date(maxDate) < date) return false;
    const today = new Date();
    if (date > today) return false;
    return true;
  };


  const handleMonthClick = (e) => {
    e.stopPropagation();
    setShowMonthPicker(true);
    setShowYearPicker(false);
  };

  const handleYearClick = (e) => {
    e.stopPropagation();
    setShowYearPicker(true);
    setShowMonthPicker(false);
  };

  const handleMonthSelect = (month) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(month);
      return newDate;
    });
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowCalendar(!showCalendar);
    }
  };

  const renderMonthPicker = () => {
    const now = new Date();
    const currentMonthIndex = now.getMonth();
    const isCurrentYear = currentDate.getFullYear() === now.getFullYear();

    return (
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((month, index) => {
          const isDisabled = isCurrentYear && index > currentMonthIndex;
          return (
            <button
              key={index}
              onClick={() => !isDisabled && handleMonthSelect(index)}
              className={`w-full py-2 text-sm rounded-md transition-all duration-200 glossy-picker ${
                isDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={isDisabled}
            >
              {month}
            </button>
          );
        })}
      </div>
    );
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const startYear = Math.max(2010, currentYear - 14);
    const years = Array.from({length: currentYear - startYear + 1}, (_, i) => startYear + i);
    return (
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            className="w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-200 glossy-picker"
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const calendarDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = date.getDate() === day && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
      const isToday = today.toDateString() === calendarDate.toDateString();
      const isDisabled = !isDateInRange(calendarDate);

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateClick(day)}
          disabled={isDisabled}
          className={`w-8 h-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out text-sm font-medium custom-date-shadow border glossy-date
            ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : 
              isToday ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 
              isDisabled ? 'text-gray-300 cursor-not-allowed' :
              'hover:bg-blue-300 text-gray-700'}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`custom-date-picker relative ${className}`} ref={calendarRef}>
      <div className="relative">
        <input
          className="w-full px-4 text-sm bg-transparent sm:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md transition-all duration-300 ease-in-out cursor-pointer"
          placeholder="Select a date"
          value={date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          onClick={() => setShowCalendar(!showCalendar)}
          onKeyDown={handleKeyDown}
          readOnly
          aria-haspopup="true"
          aria-expanded={showCalendar}
          aria-label="Select date"
        />
      </div>
      {(showCalendar || showMonthPicker || showYearPicker) && (
        <div className="absolute left-0 z-10 mt-2 bg-white shadow-lg rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200 animate-in fade-in duration-300 w-full sm:w-auto min-w-[300px] sm:min-w-[340px] md:min-w-[380px]">
          <div className="flex justify-between items-center mb-4 bg-gray-100 rounded-lg p-2">
            <button 
              onClick={handlePrevMonth} 
              className={`text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-all duration-200 ${
                isPrevMonthDisabled() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:text-gray-800'
              }`}
              aria-label="Previous month"
              disabled={isPrevMonthDisabled()}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span
                onClick={handleMonthClick}
                className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium glossy-text"
                aria-label="Select month"
              >
                {MONTHS[currentDate.getMonth()]}
              </span>
              <span className="text-gray-400">/</span>
              <span
                onClick={handleYearClick}
                className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium glossy-text"
                aria-label="Select year"
              >
                {currentDate.getFullYear()}
              </span>
            </div>
            <button 
              onClick={handleNextMonth} 
              className={`text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-all duration-200 ${
                isNextMonthDisabled() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:text-gray-800'
              }`}
              aria-label="Next month"
              disabled={isNextMonthDisabled()}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          {showMonthPicker ? renderMonthPicker() : 
           showYearPicker ? renderYearPicker() : (
            <>
              <div className="bg-gray-50 rounded-lg p-2 glossy-selector">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map(day => (
                    <div key={day} className="text-gray-500 font-medium text-xs uppercase text-center">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar()}
                </div>
              </div>
            </>
          )}
          <div className="mt-4 text-center">
            <button
              onClick={() => handleDateClick(new Date().getDate())}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
