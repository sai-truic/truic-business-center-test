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

export const Country = React.forwardRef(({ id, name, placeholder, required, value, onChange, icon, iconClassName, ...props }, ref) => {
  const { getState, updateState } = useInputState();
  const [internalValue, setInternalValue] = useState(value !== undefined ? value : (getState('country', id)?.value || ''));
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);
  const lastRequestRef = useRef(null);

  useEffect(() => {
    setInternalValue(value !== undefined ? value : (getState('country', id)?.value || ''));
  }, [value, id, getState]);

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const cacheKey = `country_${query}`;
    const cachedSuggestions = getFromCache(cacheKey);
    if (cachedSuggestions) {
      setSuggestions(cachedSuggestions);
      return;
    }

    setIsLoading(true);
    const currentRequest = Date.now();
    lastRequestRef.current = currentRequest;

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (lastRequestRef.current === currentRequest && Array.isArray(data)) {
        const countryData = data.map(country => ({
          name: country.name.common,
          official: country.name.official
        }));
        setSuggestions(countryData.slice(0, 5));
        setToCache(cacheKey, countryData.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching country suggestions:', error);
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
      updateState('country', id, { value: newValue });
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  }, [fetchSuggestions, id, onChange, updateState]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setInternalValue(suggestion.name);
    if (onChange) {
      onChange(suggestion.name);
    } else {
      updateState('country', id, { value: suggestion.name });
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
                {suggestion.name} ({suggestion.official})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

Country.displayName = 'Country';
