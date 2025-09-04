
import { QRInput } from '../../QRForms/QRInput';


export const GoogleSheets = ({handleInputChange}) => {

    return (

        <QRInput label={"Google Sheets URL"} type={'text'} name={"GoogleSheets"} placeholder={"Enter your Google Sheets URL here..."} handleInputChange={handleInputChange} />
    )
}


export default GoogleSheets;