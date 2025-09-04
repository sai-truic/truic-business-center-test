import React, { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const CustomClerkForm = ({ isSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignIn) {
                await signIn.create({
                    identifier: email,
                    password,
                });
            } else {
                await signUp.create({
                    emailAddress: email,
                    password,
                    firstName,
                    lastName,
                });
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    const inputClasses = "mt-1 block w-full px-4 py-3 rounded-lg border-2 border-[#38657A] bg-white bg-opacity-80 shadow-sm focus:border-[#F4A262] focus:ring focus:ring-[#F4A262] focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105";
    const labelClasses = "block text-sm font-semibold text-[#38657A] mb-1";

    return (
        <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {!isSignIn && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <label htmlFor="firstName" className={labelClasses}>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClasses}
                            required
                        />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClasses}
                            required
                        />
                    </motion.div>
                </div>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                    required
                />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <label htmlFor="password" className={labelClasses}>Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClasses}
                    required
                />
            </motion.div>
            {error && (
                <motion.p 
                    className="text-red-500 text-sm bg-red-100 border border-red-400 rounded-md p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {error}
                </motion.p>
            )}
            <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#DB6300] to-[#F4A262] text-white hover:from-[#C55A00] hover:to-[#DB6300] transition duration-300 py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F4A262] focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isSignIn ? 'Sign In' : 'Sign Up'}
            </motion.button>
        </motion.form>
    );
};

export default CustomClerkForm;
