import React, { useState, useRef, useEffect } from 'react';

const InputBox = ({
  inputValue,
  handleKeySubmission,
  handleInputChange,
  onSubmit
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  // Focus input on mount for better UX
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle Enter key in input field
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        onSubmit();
      }
    }
  };

  // Handle focus events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-4 mb-6">
        {/* Keywords input */}
        <div className="relative w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="keywords-input">
            Keywords
          </label>
          <input
            ref={inputRef}
            id="keywords-input"
            type="text"
            placeholder="Enter keywords (e.g., creative, digital marketing)"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full px-5 py-3.5 rounded-lg border-2 transition-all duration-200 ${
              isFocused 
                ? 'border-orange-500 ring-2 ring-orange-200 bg-orange-50' 
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            } focus:outline-none text-gray-800 placeholder-gray-500`}
            style={{ boxShadow: isFocused ? '0 0 0 3px rgba(251, 146, 60, 0.1)' : 'none' }}
          />
        </div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center">
        <button
          ref={buttonRef}
          onClick={onSubmit}
          disabled={inputValue.trim() === ''}
          className={`px-8 py-3.5 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
            inputValue.trim() === ''
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-lg hover:shadow-xl glossy-button'
          }`}
        >
          Generate Business Names
        </button>
      </div>
    </div>
  );
};

export default InputBox;