import {QRCodeCanvas} from 'qrcode.react';


export const AppleNotes = ({ inputValues }) => {

    return (
        <div>
            <QRCodeCanvas
                className='rounded-xl border-2 border-orange-200 shadow-lg hover:border-[#F7931E] transition-all duration-300'
                value={inputValues.name}
                size={256}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
                includeMargin={true}
                imageSettings={{
                    src: "https://static.zpao.com/favicon.png",
                    x: undefined,
                    y: undefined,
                    height: 48,
                    width: 48,
                    excavate: true,
                }}
            />
            <div className='w-32 rounded-xl bg-gradient-to-r from-[#F7931E] to-orange-600 text-center text-white font-bold py-3 shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300'>Scan Me</div>
        </div>
    );
}

export default AppleNotes;
