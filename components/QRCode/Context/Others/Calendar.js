import { QRInput } from './../../QRForms/QRInput';


export const Calendar = ({ handleInputChange }) => {

    return (
        <>
            <label htmlFor="calendar" className="block text-sm font-bold text-gray-700">Calendar:</label>
            <div className='mt-3' />
            <QRInput label={"Title"} type={'text'} name={"calendarTitle"} placeholder={"Title"} handleInputChange={handleInputChange} />
            <div className='mt-3' />
            <QRInput label={"Start Date:"} type={'date'} name={"StartDate"} placeholder={""} handleInputChange={handleInputChange} />
            <div className='mt-3' />
            <QRInput label={"End Date:"} type={'date'} name={"EndDate"} placeholder={"Longitude"} handleInputChange={handleInputChange} />
        </>
    )
}


export default Calendar;