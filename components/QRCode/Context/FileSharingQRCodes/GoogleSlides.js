
import { QRInput } from '../../QRForms/QRInput';


export const GoogleSlides = ({handleInputChange}) => {

    return (

        <QRInput label={"Google Slides URL"} type={'text'} name={"GoogleSlides"} placeholder={"Enter your Google Slides URL here..."} handleInputChange={handleInputChange} />
    )
}


export default GoogleSlides;