
import { useEffect, useState } from 'react';
import useInputState from './../useInputState';
import QRCodeGenerate from './Generate/QRCodeGenerate';


export const QRGenerateConditional = ({ inputValues }) => {
    const { qrMenuSelected, qrCode, shouldGenerate, setShouldGenerate } = useInputState();
    const [qrCodeProps, setQrCodeProps] = useState(null); // State to store final QR code props
    const validateMeCardField = (value) => {
        if (!value) return '';
        // Remove any characters that could break the MeCard format
        return value.replace(/[;\n\r]/g, ' ').trim();
    };
    const formatBirthday = (dateStr) => {
        if (!dateStr) return '';
        // Remove any non-numeric characters
        const cleaned = dateStr.replace(/[^\d]/g, '');
        if (cleaned.length === 8) {
            const mm = cleaned.slice(0, 2);
            const dd = cleaned.slice(2, 4);
            const yyyy = cleaned.slice(4);
            return yyyy + mm + dd;
        }
        return cleaned;
    };

    const generateQRCodeProps = () => {
        const props = {
            ...inputValues.current,
            FrameText: qrCode.FrameText || "Scan Me",
            FrameColor: qrCode.FrameColor || "#F7931E",
            FrameTextColor: qrCode.FrameTextColor || "#FFFFFF",
            FrameBackgroundColor: qrCode.FrameBackgroundColor || "#FFFFFF",
            IncludeMargin: qrCode.IncludeMargin || false,
            EnableOuterFrame: qrCode.EnableOuterFrame || false,
            OuterFrameColor: qrCode.OuterFrameColor || "#F7931E",
            LogoURL: qrCode.LogoURL || "",
            LogoWidth: qrCode.LogoWidth || 48,
            LogoHeight: qrCode.LogoHeight || 48,
            CenterLogo: qrCode.CenterLogo || true
          };
        if (qrMenuSelected === 'vCard') {                                                                                                                 
            props.size = 256; // Larger size for vCards
            const cleanValue = (value) => value || '';                                                                                                                                                                                                                                           
            // Format name fields                                                                                                                         
            const firstName = cleanValue(qrCode.vCardFN);                                                                                                 
            const lastName = cleanValue(qrCode.vCardLN);                                                                                                                                                                                                                                               
            props.ValueText = [                                                                                                          
                'BEGIN:VCARD',                                                                                                                            
                'VERSION:3.0',                                                                                                                            
                `FN:${firstName} ${lastName}`,                                                                                                            
                `N:${lastName};${firstName};;;`,                                                                                                          
                qrCode.vCardMobile ? `TEL;TYPE=CELL:${qrCode.vCardMobile}` : '',                                                                          
                qrCode.vCardPhone ? `TEL;TYPE=HOME:${qrCode.vCardPhone}` : '',                                                                            
                qrCode.vCardFax ? `TEL;TYPE=FAX:${qrCode.vCardFax}` : '',                                                                                 
                qrCode.vCardEmail ? `EMAIL:${qrCode.vCardEmail}` : '',                                                                                    
                qrCode.vCardCompany ? `ORG:${qrCode.vCardCompany}` : '',                                                                                  
                qrCode.vCardDesignation ? `TITLE:${qrCode.vCardDesignation}` : '',                                                                        
                qrCode.vCardStreet || qrCode.vCardCity || qrCode.vCardState || qrCode.vCardZip || qrCode.vCardCountry ? `ADR;TYPE=WORK:;;${cleanValue(qrCode.vCardStreet)};${cleanValue(qrCode.vCardCity)};${cleanValue(qrCode.vCardState)};${cleanValue(qrCode.vCardZip)};${cleanValue(qrCode.vCardCountry)}` : '',                                                                                             
                qrCode.vCardWebsite ? `URL:${qrCode.vCardWebsite}` : '',                                                                                  
                'END:VCARD',                                                                                                                               
            ]                                                                                                                                             
            .filter(Boolean) // Remove empty lines                                                                                                   
            .join('\r\n'); // Use proper line endings                                                                                  
        } else if (qrMenuSelected === 'MeCard') {
            const meCardFields = {
                name: qrCode.MeCardFirstName && qrCode.MeCardLastName ? `N:${validateMeCardField(qrCode.MeCardLastName)}, ${validateMeCardField(qrCode.MeCardFirstName)}` : '',
                tel1: qrCode.MeCardPhone1 ? `TEL:${validateMeCardField(qrCode.MeCardPhone1)}` : '',
                tel2: qrCode.MeCardPhone2 ? `TEL:${validateMeCardField(qrCode.MeCardPhone2)}` : '',
                tel3: qrCode.MeCardPhone3 ? `TEL:${validateMeCardField(qrCode.MeCardPhone3)}` : '',
                email: qrCode.MeCardEmail ? `EMAIL:${validateMeCardField(qrCode.MeCardEmail)}` : '',
                url: qrCode.MeCardWebsite ? `URL:${validateMeCardField(qrCode.MeCardWebsite)}` : '',
                nickname: qrCode.MeCardNickname ? `NICKNAME:${validateMeCardField(qrCode.MeCardNickname)}` : '',
                birthday: qrCode.MeCardBirthday ? `BDAY:${formatBirthday(qrCode.MeCardBirthday)}` : '',
                adr: (qrCode.MeCardStreet || qrCode.MeCardCity || qrCode.MeCardState || qrCode.MeCardZip || qrCode.MeCardCountry) ? 
                    `ADR:${validateMeCardField([
                        qrCode.MeCardStreet || '',
                        qrCode.MeCardUnit || '',
                        qrCode.MeCardCity || '',
                        qrCode.MeCardState || '',
                        qrCode.MeCardZip || '',
                        qrCode.MeCardCountry || ''
                    ].join(','))}` : '',
                memo: qrCode.MeCardMemo ? `MEMO:${validateMeCardField(qrCode.MeCardMemo)}` : ''
            };
            props.ValueText = `MECARD:${Object.values(meCardFields)
                .filter(Boolean)
                .join(';')};`;
        } else if (qrMenuSelected === 'WiFi') {
            props.ValueText = `WIFI:T:${qrCode.wifiAuthentication || "WPA"};S:${qrCode.wifiName || ""};P:${qrCode.wifiPassword || ""};H:${qrCode.wifiHidden ? "true" : "false"};;`;
        } else if (qrMenuSelected === 'URL') {
            props.ValueText = qrCode.URL || '';
        } else if (qrMenuSelected === 'Plain Text') {
            props.ValueText = qrCode.PlainText || '';
        } else if (qrMenuSelected === 'Apple Notes') {
            props.ValueText = qrCode.AppleNotes || '';
        } else if (qrMenuSelected === 'Phone Number') {
            props.ValueText = "TEL:"+qrCode.PhoneNumber || '';
        } else if (qrMenuSelected === 'Email') {
            props.ValueText = `mailto:${qrCode.EmailEmails}?subject=${encodeURIComponent(qrCode.EmailSubjects)}&body=${encodeURIComponent(qrCode.EmailMessages)}` || '';
        } else if (qrMenuSelected === 'SMS') {
            props.ValueText = `smsto:${qrCode.SMSPhone}:${qrCode.SMSMessage}` || '';
        } else if (qrMenuSelected === 'Youtube') {
            props.ValueText = qrCode.Youtube;
        } else if (qrMenuSelected === 'Facebook') {
            props.ValueText = qrCode.Facebook;
        } else if (qrMenuSelected === 'Twitter') {
            props.ValueText = qrCode.Twitter;
        } else if (qrMenuSelected === 'Instagram') {
            props.ValueText = qrCode.Instagram;
        } else if (qrMenuSelected === 'LinkedIn') {
            props.ValueText = qrCode.LinkedIn;
        } else if (qrMenuSelected === 'Pinterest') {
            props.ValueText = qrCode.Pinterest;
        } else if (qrMenuSelected === 'Bitcoin') {
            props.ValueText = `bitcoin:${qrCode.bitcoinWallet}${qrCode.bitcoinAmount ? `?amount=${qrCode.bitcoinAmount}` : ''}${qrCode.bitcoinMessage ? `&message=${encodeURIComponent(qrCode.bitcoinMessage)}` : ''}`;
        } else if (qrMenuSelected === 'BitcoinCash') {
            props.ValueText = `bitcoincash:${qrCode.bitcoinCashWallet}${qrCode.bitcoinCashAmount ? `?amount=${qrCode.bitcoinCashAmount}` : ''}${qrCode.bitcoinCashMessage ? `&message=${encodeURIComponent(qrCode.bitcoinCashMessage)}` : ''}`;
        } else if (qrMenuSelected === 'Dash') {
            props.ValueText = `dash:${qrCode.DashWallet}${qrCode.DashAmount ? `?amount=${qrCode.DashAmount}` : ''}${qrCode.DashMessage ? `&message=${encodeURIComponent(qrCode.DashMessage)}` : ''}`;
        } else if (qrMenuSelected === 'Ether') {
            props.ValueText = `ethereum:${qrCode.EtherWallet}${qrCode.EtherAmount ? `?amount=${qrCode.EtherAmount}` : ''}${qrCode.EtherMessage ? `&message=${encodeURIComponent(qrCode.EtherMessage)}` : ''}`;
        } else if (qrMenuSelected === 'Litecoin') {
            props.ValueText = `litecoin:${qrCode.LiteCoinWallet}${qrCode.LiteCoinAmount ? `?amount=${qrCode.LiteCoinAmount}` : ''}${qrCode.LiteCoinMessage ? `&message=${encodeURIComponent(qrCode.LiteCoinMessage)}` : ''}`;
        } else if (qrMenuSelected === 'Geo Location'){
            props.ValueText = `http://maps.google.com/maps?q=${qrCode.Latitude},${qrCode.Longitude}`;
        } else if (qrMenuSelected === 'Calendar'){
            props.ValueText = `BEGIN:VCALENDAR\nBEGIN:VEVENT\nDTSTART:${qrCode.StartDate}\nDTEND:${qrCode.EndDate}\nSUMMARY:{title}\nEND:VEVENT\nEND:VCALENDAR`;
        } else {
            props.ValueText = qrCode.ValueText || '';
        }
        return props;
    }
    //reset shouldGenerate after rendering
    useEffect(()=>{
        if (shouldGenerate){
            const props = generateQRCodeProps();
            setQrCodeProps(props);
            setShouldGenerate(false);
        }
    }, [shouldGenerate, qrMenuSelected, qrCode, inputValues, setShouldGenerate]);
    if (!qrCodeProps) {
         return null;
     }
    // if (!shouldGenerate){
    //         return null;
    //     }  
    return <QRCodeGenerate{...qrCodeProps} />;
};


export default QRGenerateConditional;
