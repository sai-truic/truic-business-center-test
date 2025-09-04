
import { QRInput } from './../../QRForms/QRInput';


export const Dropbox = ({handleInputChange}) => {

    return (

        <QRInput label={"Dropbox URL"} type={'text'} name={"Dropbox"} placeholder={"Enter your Dropbox URL here..."} handleInputChange={handleInputChange} />
    )
}


export default Dropbox;