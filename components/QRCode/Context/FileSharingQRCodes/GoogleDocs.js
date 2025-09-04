
import { QRInput } from '../../QRForms/QRInput';


export const GoogleDocs = ({handleInputChange}) => {

    return (

        <QRInput label={"Google Docs URL"} type={'text'} name={"GoogleDocs"} placeholder={"Enter your Google Docs URL here..."} handleInputChange={handleInputChange} />
    )
}


export default GoogleDocs;