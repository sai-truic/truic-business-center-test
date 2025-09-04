import { useAtom } from 'jotai';
import OthersInput from './OthersInput';
import { wifiStateAtom } from '@/atoms/inputStateAtoms';

export const Wifi = ({ handleInputChange }) => {
  const [wifiState, setWifiState] = useAtom(wifiStateAtom);

  return (
    <OthersInput
      type="WiFi"
      handleInputChange={(name, value) => {
        setWifiState((prev) => ({ ...prev, [name]: value }));
        handleInputChange(name, value);
      }}
    />
  );
};

export default Wifi;
