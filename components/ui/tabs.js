import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Tabs components:

 <Tabs id="mainTabs">
   <TabsList>
     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
   </TabsList>
   <TabsContent value="tab1">Content for Tab 1</TabsContent>
   <TabsContent value="tab2">Content for Tab 2</TabsContent>
 </Tabs>
*/

export const Tabs = ({ id, children }) => {
  const { getState, updateState } = useInputState();
  
  const { activeTab = '' } = getState('tabs', id) || {};

  const onValueChange = (value) => {
    updateState('tabs', id, { activeTab: value });
  };

  return (
    <div className="w-full">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, activeTab, onValueChange }) => (
  <div className="flex w-full bg-gray-100 rounded-lg p-1">
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { activeTab, onValueChange });
      }
      return child;
    })}
  </div>
);

export const TabsTrigger = ({ children, value, activeTab, onValueChange }) => (
  <button
    className={`flex-1 text-center py-2 px-4 text-sm font-medium transition-all duration-200 ease-out rounded-md ${
      activeTab === value
        ? 'bg-white text-black shadow-sm'
        : 'text-gray-500 hover:bg-gray-200'
    }`}
    onClick={() => onValueChange && onValueChange(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeTab }) => (
  activeTab === value ? (
    <div>
      {children}
    </div>
  ) : null
);
