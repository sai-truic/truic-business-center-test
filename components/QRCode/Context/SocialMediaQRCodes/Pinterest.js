import { QRInput } from './../../QRForms/QRInput';


export const Pinterest = ({ handleInputChange }) => {

    return (

        <QRInput label={"Pinterest URL"} type={'text'} name={"Pinterest"} placeholder={"Enter your pinterest url here..."} handleInputChange={handleInputChange} />
    )
}


export default Pinterest;