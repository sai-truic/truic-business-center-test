import { useAtom } from 'jotai';
import SocialMediaInput from './SocialMediaInput';
import { socialMediaStateAtom } from '@/atoms/inputStateAtoms';

export const SocialMedia = ({ type, handleInputChange }) => {
  const [socialState, setSocialState] = useAtom(socialMediaStateAtom)
  return (
    <div className="mt-6">
      <SocialMediaInput 
        type={type} 
        handleInputChange={(name,value)=> {
          setSocialState(prev=>({...prev, [name]: value}))
          handleInputChange(name,value)
        }}
      />
    </div>
  );
};

export default SocialMedia;
