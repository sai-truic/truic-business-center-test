import React from 'react';
import { useAtom } from 'jotai';
import { socialMediaStateAtom } from '@/atoms/inputStateAtoms';
import SocialMedia from './SocialMedia';

export const Twitter = ({ handleInputChange }) => {
    const [socialState, setSocialState] = useAtom(socialMediaStateAtom);

    const handleChange = (name, value) => {
        setSocialState((prev) => ({ ...prev, [name]: value }));
        handleInputChange(name, value);
    };

    return <SocialMedia type="Twitter" handleInputChange={handleChange} />;
};

export default Twitter;
