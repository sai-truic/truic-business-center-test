
import {QRCodeSVG} from 'qrcode.react';
import { useAtom } from 'jotai';
import { textualQRStateAtom } from '@/atoms/inputStateAtoms';
import { useState, useEffect } from 'react';
import { QRCodeGenerate } from './QRCodeGenerate';


export const PlainText = () => {

    const [textualQRState] = useAtom(textualQRStateAtom);
    const [imgURI, setImgURI] = useState('');

    const getImageData = async () => {
        const response = await fetch("https://static.zpao.com/favicon.png", {mode:'no-cors'})
        console.log('Response :', response)
        const imageBlob = await response.blob()
        setImgURI(URL.createObjectURL(imageBlob));
    }
    useEffect(() => {
        getImageData();
    }, []);

    console.log(imgURI)

    if (!textualQRState.PlainText || textualQRState.PlainText === "") {
        return (
            <QRCodeGenerate />
        );
    } else {
        return (
            <div>
                <QRCodeSVG
                    className='rounded-xl border-2 border-orange-200 shadow-lg hover:border-[#F7931E] transition-all duration-300'
                    value={textualQRState.PlainText}
                    size={256}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"M"}
                    includeMargin={true}
                />
                <div className='w-32 rounded-xl bg-gradient-to-r from-[#F7931E] to-orange-600 text-center text-white font-bold py-3 shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300'>Scan Me</div>
            </div>
        );
    }
    
}

export default PlainText;
