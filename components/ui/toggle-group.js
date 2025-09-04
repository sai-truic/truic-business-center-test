import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the ToggleGroup component:

 <ToggleGroup id="viewMode">
   <ToggleGroupItem value="list">List View</ToggleGroupItem>
   <ToggleGroupItem value="grid">Grid View</ToggleGroupItem>
 </ToggleGroup>
*/

export const ToggleGroup = ({ id, children }) => {
  const { getState, updateState } = useInputState();
  
  const { value = '' } = getState('toggleGroup', id) || {};

  const onChange = (newValue) => {
    updateState('toggleGroup', id, { value: newValue });
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isSelected: child.props.value === value,
            onClick: () => onChange(child.props.value)
          });
        }
        return child;
      })}
    </div>
  );
};

export const ToggleGroupItem = ({ children, value, isSelected, onClick }) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 text-sm font-medium ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      } border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-700`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
