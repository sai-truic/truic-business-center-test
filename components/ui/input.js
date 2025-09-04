import React from 'react';
import useInputState from '../useInputState';
import * as Icons from 'lucide-react';

export const Input = React.forwardRef(({ id, name, placeholder, required, value, onChange, icon, iconClassName, ...props }, ref) => {
  const { getState, updateState } = useInputState();
  
  const [internalValue, setInternalValue] = React.useState('');

  React.useEffect(() => {
    const initialValue = value !== undefined ? value : (getState('input', id)?.value || '');
    if (internalValue !== initialValue) {
      setInternalValue(initialValue);
    }
  }, [value, id]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    } else {
      updateState('input', id, { value: newValue });
    }
  };

  const IconComponent = icon ? Icons[icon] : null;

  return (
    <div className="relative">
      {IconComponent && (
        <IconComponent className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`} />
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`${props.className || ''} ${IconComponent ? 'pl-10 sm:pl-12 md:pl-14' : ''}`}
        {...props}
      />
    </div>
  );
});
