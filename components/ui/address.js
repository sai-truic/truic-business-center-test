import React, { useState, useEffect, useRef, useCallback } from 'react';
import useInputState from '../useInputState';
import * as Icons from 'lucide-react';

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const getFromCache = (key) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { value, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return value;
    }
    localStorage.removeItem(key); // Remove expired cache
  }
  return null;
};

const setToCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }));
};

export const Address = React.forwardRef(({ id, name, placeholder, required, value, onChange, icon, iconClassName, ...props }, ref) => {
  const { getState, updateState } = useInputState();
  const [internalValue, setInternalValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);
  const lastRequestRef = useRef(null);

  useEffect(() => {
    const initialValue = value !== undefined ? value : (getState('address', id)?.value || '');
    if (internalValue !== initialValue) {
      setInternalValue(initialValue);
    }
  }, [value, id]);

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const cacheKey = `address_${query}`;
    const cachedSuggestions = getFromCache(cacheKey);
    if (cachedSuggestions) {
      setSuggestions(cachedSuggestions);
      return;
    }

    setIsLoading(true);
    const currentRequest = Date.now();
    lastRequestRef.current = currentRequest;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`, {
        headers: {
          'User-Agent': 'YourAppName/1.0'
        }
      });
      const data = await response.json();
      
      if (lastRequestRef.current === currentRequest) {
        const limitedData = data.slice(0, 5);
        setSuggestions(limitedData);
        setToCache(cacheKey, limitedData);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    } finally {
      if (lastRequestRef.current === currentRequest) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    } else {
      updateState('address', id, { value: newValue });
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  }, [fetchSuggestions, id, onChange, updateState]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setInternalValue(suggestion.display_name);
    if (onChange) {
      onChange(suggestion.display_name);
    } else {
      updateState('address', id, { value: suggestion.display_name });
    }
    setSuggestions([]);
  }, [id, onChange, updateState]);

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder={placeholder}
        required={required}
        className={`${props.className || ''} ${IconComponent ? 'pl-10' : ''}`}
        {...props}
      />
      {isFocused && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          <div className="backdrop-blur-sm bg-white/100">
          {isLoading && <div className="p-2 text-gray-500">Loading...</div>}
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
});
