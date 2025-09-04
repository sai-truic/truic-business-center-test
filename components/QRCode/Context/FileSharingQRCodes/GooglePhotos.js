
import { QRInput } from '../../QRForms/QRInput';


export const GooglePhotos = ({handleInputChange}) => {

    return (

        <QRInput label={"Google Photos URL"} type={'text'} name={"GooglePhotos"} placeholder={"Enter your Google Photos URL here..."} handleInputChange={handleInputChange} />
    )
}


export default GooglePhotos;