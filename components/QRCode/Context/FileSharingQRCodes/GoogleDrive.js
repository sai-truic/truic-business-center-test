
import { QRInput } from './../../QRForms/QRInput';


export const GoogleDrive = ({handleInputChange}) => {

    return (

        <QRInput label={"Google Drive URL"} type={'text'} name={"GoogleDrive"} placeholder={"Enter your Google Drive URL here..."} handleInputChange={handleInputChange} />
    )
}


export default GoogleDrive;