import { QRInput } from '../../QRForms/QRInput';


export const GoogleMaps = ({ handleInputChange }) => {

    return (
        <>
            <label htmlFor="GoogleMaps" className="block text-sm font-bold text-gray-700">Google Maps Codes:</label>
            <QRInput label={""} type={'text'} name={"GoogleLatitude"} placeholder={"Latitude"} handleInputChange={handleInputChange} />
            <div className='mt-3' />
            <QRInput label={""} type={'text'} name={"GoogleLongitude"} placeholder={"Longitude"} handleInputChange={handleInputChange} />
        </>
    )
}


export default GoogleMaps;