import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useInputState from '../useInputState';

/*
This is how you can use the Calendar component:

 <Calendar 
   id="appointmentDate" 
   onSelect={(date) => console.log('Selected date:', date)}
 />
*/

export const Calendar = ({ id, onSelect, className = '' }) => {
  const { getState, updateState } = useInputState();

  const { selected } = getState('calendar', id) || {};

  const handleSelect = (date) => {
    updateState('calendar', id, { selected: date });
    if (onSelect) {
      onSelect(date);
    }
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      className={`p-3 bg-white border border-gray-200 rounded-lg shadow ${className}`}
    />
  );
};
