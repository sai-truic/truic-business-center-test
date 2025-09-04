
import { QRInput } from './../../QRForms/QRInput';


export const OneDrive = ({handleInputChange}) => {

    return (

        <QRInput label={"OneDrive URL"} type={'text'} name={"OneDrive"} placeholder={"Enter your OneDrive URL here..."} handleInputChange={handleInputChange} />
    )
}


export default OneDrive;