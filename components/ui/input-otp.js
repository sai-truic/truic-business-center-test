import React, { useRef } from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the InputOTP component:

 <InputOTP
   id="verificationCode"
   length={6}
   onComplete={(code) => console.log('Completed OTP:', code)}
 />
*/

export const InputOTP = ({ id, length = 6, onComplete }) => {
  const { getState, updateState } = useInputState();
  const inputRefs = useRef([]);

  const { otp = Array(length).fill('') } = getState('inputOTP', id) || {};

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    updateState('inputOTP', id, { otp: newOtp });

    if (element.nextSibling) {
      element.nextSibling.focus();
    }

    if (index === length - 1 && newOtp.every(v => v !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          ref={ref => inputRefs.current[index] = ref}
          type="text"
          maxLength="1"
          value={data}
          onChange={e => handleChange(e.target, index)}
          className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      ))}
    </div>
  );
};
