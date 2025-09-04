import useInputState from '../../useInputState';
import { PlainText } from './TextualQRCodes/PlainText'
import { URL } from './TextualQRCodes/URL'
import { AppleNotes } from './TextualQRCodes/AppleNotes'
import { ContactCard } from './ContactInformationQRCodes/ContactCard'
import { PhoneNumber } from './ContactInformationQRCodes/PhoneNumber'
import { VCard } from './ContactInformationQRCodes/VCard'
import { Email } from './ContactInformationQRCodes/Email'
import { SMS } from './ContactInformationQRCodes/SMS'
import { MeCard } from './ContactInformationQRCodes/MeCard'
import { QRLookups } from './TRUiCBusinessTools/QRLookups'
import { Youtube } from './SocialMediaQRCodes/Youtube'
import { Facebook } from './SocialMediaQRCodes/Facebook'
import { Twitter } from './SocialMediaQRCodes/Twitter'
import { Instagram } from './SocialMediaQRCodes/Instagram'
import { LinkedIn } from './SocialMediaQRCodes/LinkedIn'
import { Pinterest } from './SocialMediaQRCodes/Pinterest'
import { IosAppStore } from './SocialMediaQRCodes/IosAppStore'
import { GoogleAppStore } from './SocialMediaQRCodes/GoogleAppStore'
import { GoogleDrive } from './FileSharingQRCodes/GoogleDrive';
import { Dropbox } from './FileSharingQRCodes/Dropbox';
import { OneDrive } from './FileSharingQRCodes/OneDrive';
import { Box } from './FileSharingQRCodes/Box';
import { ICloud } from './FileSharingQRCodes/ICloud';
import { GooglePhotos } from './FileSharingQRCodes/GooglePhotos';
import { GoogleDocs } from './FileSharingQRCodes/GoogleDocs';
import { GoogleSheets } from './FileSharingQRCodes/GoogleSheets';
import { GoogleSlides } from './FileSharingQRCodes/GoogleSlides';
import { Bitcoin } from './DigitalWalletQRCodes/Bitcoin'
import { BitcoinCash } from './DigitalWalletQRCodes/BitcoinCash'
import { Dash } from './DigitalWalletQRCodes/Dash'
import { Ether } from './DigitalWalletQRCodes/Ether'
import { Litecoin } from './DigitalWalletQRCodes/Litecoin'
import { GeoLocation } from './TravelQRCodes/GeoLocation'
import { GoogleMaps } from './TravelQRCodes/GoogleMaps'
import { Wifi } from './Others/Wifi'
import { Calendar } from './Others/Calendar'


export const InputLayer = ({handleInputChange, inputValues}) => {
    const { qrMenuSelected } = useInputState();

    
    return (
        <>
            {(() => {
                switch(qrMenuSelected) {
                    // Textual QR Codes
                    case 'URL': return <URL handleInputChange={handleInputChange} />
                    case 'Plain Text': return <PlainText handleInputChange={handleInputChange} />
                    case 'Apple Notes': return <AppleNotes handleInputChange={handleInputChange} />
                    case 'vCard':
                        return <VCard handleInputChange={handleInputChange} />;
                    case 'MeCard':
                        return <MeCard handleInputChange={handleInputChange} />;
                    case 'Contact Number':
                    case 'Phone Number': return <PhoneNumber handleInputChange={handleInputChange} />
                    case 'Email': return <Email handleInputChange={handleInputChange} />
                    case 'SMS': return <SMS handleInputChange={handleInputChange} />
                    case 'Lookups': return <QRLookups handleInputChange={handleInputChange} />
                    case 'Youtube': return <Youtube handleInputChange={handleInputChange} />
                    case 'Facebook': return <Facebook handleInputChange={handleInputChange} />
                    case 'Twitter': return <Twitter handleInputChange={handleInputChange} />
                    case 'Instagram': return <Instagram handleInputChange={handleInputChange} />
                    case 'LinkedIn': return <LinkedIn handleInputChange={handleInputChange} />
                    case 'Pinterest': return <Pinterest handleInputChange={handleInputChange} />
                    case 'iOS App Store': return <IosAppStore handleInputChange={handleInputChange} />
                    case 'Google App Store': return <GoogleAppStore handleInputChange={handleInputChange} />
                    case 'Google Drive': return <GoogleDrive handleInputChange={handleInputChange} />
                    case 'Dropbox': return <Dropbox handleInputChange={handleInputChange} />
                    case 'OneDrive': return <OneDrive handleInputChange={handleInputChange} />
                    case 'Box': return <Box handleInputChange={handleInputChange} />
                    case 'iCloud': return <ICloud handleInputChange={handleInputChange} />
                    case 'Google Photos': return <GooglePhotos handleInputChange={handleInputChange} />
                    case 'Google Docs': return <GoogleDocs handleInputChange={handleInputChange} />
                    case 'Google Sheets': return <GoogleSheets handleInputChange={handleInputChange} />
                    case 'Google Slides': return <GoogleSlides handleInputChange={handleInputChange} />
                    case 'Geo Location': return <GeoLocation handleInputChange={handleInputChange} />
                    case 'Google Maps': return <GoogleMaps handleInputChange={handleInputChange} />
                    case 'WiFi': return <Wifi handleInputChange={handleInputChange} />
                    case 'Calendar': return <Calendar handleInputChange={handleInputChange} />
                    case 'Bitcoin': return <Bitcoin handleInputChange={handleInputChange} />
                    case 'BitcoinCash': return <BitcoinCash handleInputChange={handleInputChange} />
                    case 'Dash': return <Dash handleInputChange={handleInputChange} />
                    case 'Ether': return <Ether handleInputChange={handleInputChange} />
                    case 'Litecoin': return <Litecoin handleInputChange={handleInputChange} />
                    default: return <PlainText handleInputChange={handleInputChange} />
                }
            })()}
        </>
    )

}


export default InputLayer;
