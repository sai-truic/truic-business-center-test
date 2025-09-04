
import { QRInput } from './../../QRForms/QRInput';


export const Box = ({handleInputChange}) => {

    return (

        <QRInput label={"Box URL"} type={'text'} name={"Box"} placeholder={"Enter your Box URL here..."} handleInputChange={handleInputChange} />
    )
}


export default Box;