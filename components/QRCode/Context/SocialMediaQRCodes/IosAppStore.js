import { QRInput } from './../../QRForms/QRInput';


export const IosAppStore = ({ handleInputChange }) => {

    return (

        <QRInput label={"iOS App Store URL"} type={'text'} name={"IosAppStore"} placeholder={"Enter your ios app store url here..."} handleInputChange={handleInputChange} />
    )
}


export default IosAppStore; 