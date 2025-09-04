import React, { createContext, useContext, useState } from 'react';

const RadioGroupContext = createContext();

export const RadioGroup = React.forwardRef(({ id, children, className, defaultValue, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const onValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };

  return (
    <RadioGroupContext.Provider value={{ selectedValue, onValueChange }}>
      <div ref={ref} className={className} role="radiogroup" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { selectedValue, onValueChange } = useContext(RadioGroupContext);

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        className="form-radio w-4 h-4 inline-block mb-1 mr-2 rounded-full border border-gray-400 flex-shrink-0"
        ref={ref}
        checked={selectedValue === value}
        onChange={() => onValueChange(value)}
        value={value}
        {...props}
      />
      {children}
    </label>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";