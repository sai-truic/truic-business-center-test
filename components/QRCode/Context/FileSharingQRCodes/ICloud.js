
import { QRInput } from '../../QRForms/QRInput';


export const ICloud = ({handleInputChange}) => {

    return (

        <QRInput label={"iCloud URL"} type={'text'} name={"ICloud"} placeholder={"Enter your iCloud URL here..."} handleInputChange={handleInputChange} />
    )
}


export default ICloud;