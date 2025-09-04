import { QRInput } from './../../QRForms/QRInput';


export const GoogleAppStore = ({ handleInputChange }) => {

    return (

        <QRInput label={"Google App Store URL"} type={'text'} name={"GoogleAppStore"} placeholder={"Enter your google app store url here..."} handleInputChange={handleInputChange} />
    )
}


export default GoogleAppStore;