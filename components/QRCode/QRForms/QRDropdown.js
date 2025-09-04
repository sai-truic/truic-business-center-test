import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter, useSearchParams } from 'next/navigation'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const qrcodes = [
    { id: 1, name: 'Textual QR Codes', href: '/qrcodes/textual-qr-codes' },
    { id: 2, name: 'Contact Information QR Codes', href:'/qrcodes/contact-information-qr-codes' },
    { id: 3, name: 'TRUiC Business Tools', href: '/qrcodes/truic-business-tools' },
    { id: 4, name: 'Social Media QR Codes', href: '/qrcodes/social-media-qr-codes' },
    { id: 5, name: 'File Sharing QR Codes', href: '/qrcodes/file-sharing-qr-codes' },
    { id: 6, name: 'Other QR Codes', href: '/qrcodes/other-qr-codes' },
]

const textual_qr_codes = [
    { id: 1, name: 'Plain Text', href: '/qrcodes/plain-text' },
    { id: 2, name: 'URL', href:'/qrcodes/url' },
    { id: 3, name: 'Apple Notes', href: '/qrcodes/apple-notes' },
]

const contact_information_qr_codes = [
    { id: 1, name: 'vCard', href: '/qrcodes/vcard' },
    { id: 2, name: 'Phone Number', href:'/qrcodes/phone-number' },
    { id: 3, name: 'Email', href: '/qrcodes/email' },
    { id: 4, name: 'vCard', href: '/qrcodes/SMS' },
    { id: 5, name: 'Phone Number', href:'/qrcodes/MeCard' },
]

const truic_business_tools = [
    { id: 1, name: 'Lookups', href: '/qrcodes/lookups' },
    { id: 2, name: 'Calculators', href:'/qrcodes/calculators' },
    { id: 3, name: 'Chatbots', href: '/qrcodes/chatbots' },
    { id: 4, name: 'Product Pages', href: '/qrcodes/product-pages' },
    { id: 5, name: 'Forms', href:'/qrcodes/forms' },
    { id: 6, name: 'Conditional Forms', href: '/qrcodes/conditional-forms' },
    { id: 7, name: 'Restaurant Menu', href: '/qrcodes/restaurant-menu' },
    { id: 8, name: 'Business Contact Forms', href: '/qrcodes/business-contact-forms' },
]

const social_media_qr_codes = [
    { id: 1, name: 'Youtube', href: '/qrcodes/youtube' },
    { id: 2, name: 'Facebook', href:'/qrcodes/facebook' },
    { id: 3, name: 'Twitter', href: '/qrcodes/twitter' },
    { id: 4, name: 'Instagram', href: '/qrcodes/instagram' },
    { id: 5, name: 'LinkedIn', href:'/qrcodes/linkedin' },
    { id: 6, name: 'Pinterest', href: '/qrcodes/pinterest' },
    { id: 7, name: 'iOS App Store', href: '/qrcodes/ios_app_store' },
    { id: 7, name: 'Google App Store', href: '/qrcodes/google_app_store' },
]

const file_sharing_qr_codes = [
    { id: 1, name: 'Google Drive', href: '/qrcodes/google_drive' },
    { id: 2, name: 'Dropbox', href:'/qrcodes/dropbox' },
    { id: 3, name: 'OneDrive', href: '/qrcodes/onedrive' },
    { id: 4, name: 'Box', href: '/qrcodes/box' },
    { id: 5, name: 'iCloud', href:'/qrcodes/icloud' },
    { id: 6, name: 'Google Photos', href: '/qrcodes/google_photos' },
    { id: 7, name: 'Google Docs', href: '/qrcodes/google_docs' },
    { id: 8, name: 'Google Sheets', href: '/qrcodes/google_sheets' },
    { id: 9, name: 'Google Slides', href: '/qrcodes/google_slides' },
    { id: 10, name: 'Google Forms', href: '/qrcodes/google_forms' },
    { id: 11, name: 'Google Maps', href: '/qrcodes/google_maps' },
    { id: 12, name: 'Google Calendar', href: '/qrcodes/google_calendar' },
    { id: 13, name: 'Google Keep', href: '/qrcodes/google_keep' },
]

const other_qr_codes = [
    { id: 1, name: 'WiFi', href: '/qrcodes/wifi' },
    { id: 2, name: 'Geo Location', href:'/qrcodes/geo_location' },
    { id: 3, name: 'Calendar', href: '/qrcodes/calendar' },
    { id: 3, name: 'Bitcoin', href: '/qrcodes/bitcoin' },
]

export const QRDropdown = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        const data_base = searchParams.get('data_base')
        console.log('data_base:', data_base)
        if (data_base === 'textual-qr-codes') {
            setMenuItems(() => textual_qr_codes);
        } else if (data_base === 'contact-information-qr-codes') {
            setMenuItems(() => contact_information_qr_codes);
        } else if (data_base === 'truic-business-tools') {
            setMenuItems(() => truic_business_tools);
        } else if (data_base === 'social-media-qr-codes') {
            setMenuItems(() => social_media_qr_codes);
        } else if (data_base === 'file-sharing-qr-codes') {
            setMenuItems(() => file_sharing_qr_codes);
        } else if (data_base === 'other-qr-codes') {
            setMenuItems(() => other_qr_codes);
        }
    }, [searchParams]);

    console.log("MenuItems :",menuItems)


    return (
    <Menu as="div" className="w-3/4 mx-auto relative">
        <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            Choose a Category
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        </div>

        <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
            {qrcodes.map((link) => (
                <Menu.Item key={link.href} as={Fragment}>
                    {({ active }) => (
                        <a
                            href={link.href}
                            className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                                )}
                        >
                            {link.name}
                        </a>
                    )}
                </Menu.Item>
            ))}
            </div>
        </Menu.Items>
        </Transition>
    </Menu>
    )
    }


export default QRDropdown;