

import { useState, useRef } from 'react';
import { validateEmail } from '../utils/validation';

export const QRInput = (props) => {
    const [error, setError] = useState('');
    const [value, setValue] = useState('');
    const validateTimeout = useRef(null);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (props.type === 'email') {
            // Clear previous timeout
            if (validateTimeout.current) {
                clearTimeout(validateTimeout.current);
            }

            // Set new validation timeout
            validateTimeout.current = setTimeout(() => {
                if (!validateEmail(newValue)) {
                    setError('Please enter a valid email address');
                } else {
                    setError('');
                    props.handleInputChange(props.name, newValue);
                }
            }, 1000);
        } else {
            props.handleInputChange(props.name, newValue);
        }
    };

    if (props.type === 'text' || props.type === 'email') {
        return (
            <>
                <div className={`mt-${props.mt} mx-${props.mx}`} >
                    <label htmlFor={props.name} className="block text-sm font-bold text-neutral-950">
                        {props.label}
                    </label>
                    <input
                        type={props.type}
                        name={props.name}
                        id={props.name}
                        placeholder={props.placeholder}
                        value={value}
                        onChange={handleChange}
                        className={`block w-${props.inW} rounded-xl
                          ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-2 border-orange-200'} 
                          shadow-lg focus:border-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2
                          bg-orange-50 hover:border-orange-300
                          transition-all duration-300
                          sm:text-sm font-medium`}
                    />
                    {error && (
                        <p className="text-sm text-red-500 mt-1 ml-1">{error}</p>
                    )}
                </div>
            </>
        )
    } else if (props.type === 'checkbox') {
        return (
            <>
                <label htmlFor={props.name} className="block text-sm font-bold text-neutral-950">
                    {props.label}
                </label>
                <div className="mt-3 px-8 flex items-center">
                    <input
                        id={props.name}
                        name={props.name}
                        type={props.type}
                        defaultChecked
                        onChange={props.handleInputChange}
                        className="h-4 w-4 rounded border-2 border-orange-200 text-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                    />
                </div>
            </>
        )
    } else if (props.type === 'color') {
        return (
            <>
                <label htmlFor={props.name} className="block text-sm font-bold text-neutral-950">
                    {props.label}
                </label>
                <div className="mt-3 px-6 flex items-center">
                    <input
                        id={props.name}
                        name={props.name}
                        type={props.type}
                        onChange={(e) => props.handleInputChange(e.target.id, e.target.value)}
                        className="h-8 w-12 rounded-xl border-2 border-orange-200 text-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 
                        hover:border-orange-300 transition-all duration-300"
                    />
                </div>
            </>
        )
    } else if (props.type === 'password') {
        return (
            <>
                <div className={`mt-${props.mt} mx-${props.mx}`} >
                    <label htmlFor={props.name} className="block text-sm font-bold text-neutral-950">
                        {props.label}
                    </label>
                    <input
                        id={props.name}
                        name={props.name}
                        type={props.type}
                        onChange={props.handleInputChange}
                        placeholder={props.placeholder}
                        className={`block w-${props.inW} rounded-xl border-2 border-orange-200 shadow-lg 
                        focus:border-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 
                        bg-orange-50 hover:border-orange-300
                        transition-all duration-300 sm:text-sm font-medium`}
                    />
                </div>
            </>
        )
    } else if (props.type === 'date') {
        return (
            <>
                <div className={`mt-${props.mt} mx-${props.mx}`} >
                    <label htmlFor={props.name} className="block text-sm font-bold text-neutral-950">
                        {props.label}
                    </label>
                    <input
                        id={props.name}
                        name={props.name}
                        type={props.type}
                        onChange={props.handleInputChange}
                        className={`block w-${props.inW} rounded-xl border-2 border-orange-200 shadow-lg 
                        focus:border-[#F7931E] focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 
                        bg-orange-50 hover:border-orange-300
                        transition-all duration-300 sm:text-sm font-medium`}
                    />
                </div>
            </>
        )
    }
}

QRInput.defaultProps = {
    label: "Plain Text",
    type: "text",
    name: "PlainText",
    placeholder: "",
    mt: "1",
    mx: "1",
    inW: "full",
    handleInputChange: () => {}
}

export default QRInput;
