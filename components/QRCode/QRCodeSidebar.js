import { Disclosure } from '@headlessui/react'

const navigation = [
  {
    name: 'Textual QR Codes',
    current: false,
    children: [
      { name: 'Plain Text', href: '/qrcodes/plain-text' },
      { name: 'URL', href: '/qrcodes/url' },
      { name: 'Apple Notes', href: '/qrcodes/apple-notes' },
    ],
  },
  {
    name: 'Contact Information QR Codes',
    current: false,
    children: [
      { name: 'vCard', href: '/qrcodes/vcard' },
      { name: 'Phone Number', href: '/qrcodes/phone-number' },
      { name: 'Email', href: '/qrcodes/email' },
      { name: 'SMS', href: '/qrcodes/sms' },
      { name: 'MeCard', href: '/qrcodes/mecard' },
    ],
  },
  {
    name: 'TRUiC Business Tools',
    current: false,
    children: [
      { name: 'Lookups', href: '/qrcodes/lookups' },
      { name: 'Calculators', href: '/qrcodes/calculators/' },
      { name: 'Chatbots', href: '/qrcodes/chatbots' },
      { name: 'Product Pages', href: '/qrcodes/product-pages' },
      { name: 'Forms', href: '/qrcodes/forms' },
      { name: 'Conditional Forms', href: '/qrcodes/conditional-forms' },
      { name: 'Restaurant Menu', href: '/qrcodes/restaurant-menu' },
      { name: 'Business Contact Forms', href: '/qrcodes/business-contact-forms' },
    ],
  },
  {
    name: 'Social Media',
    current: false,
    children: [
      { name: 'Youtube', href: '/qrcodes/youtube' },
      { name: 'Facebook', href: '/qrcodes/facebook' },
      { name: 'Instagram', href: '/qrcodes/instagram' },
      { name: 'Twitter', href: '/qrcodes/twitter' },
      { name: 'Pinterest', href: '/qrcodes/pinterest' },
      { name: 'Linkedin', href: '/qrcodes/linkedin' },
      { name: 'iOS App Store', href: '/qrcodes/ios-app-store' },
      { name: 'Google App Store', href: '/qrcodes/google-app-store' },
    ],
  },
  {
    name: 'File Sharing QR Codes',
    current: false,
    children: [
      { name: 'DropBox', href: '/qrcodes/dropbox' },
      { name: 'Google Drive', href: '/qrcodes/google-drive' },
    ],
  },
  {
    name: 'Others',
    current: false,
    children: [
      { name: 'WiFi', href: '/qrcodes/wifi' },
      { name: 'Geo Location', href: '/qrcodes/geo-location' },
      { name: 'Calendar', href: '/qrcodes/calendar' },
      { name: 'Bitcoin', href: '/qrcodes/bitcoin' },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const QRCodeSidebar = () => {
  return (
    <div className="flex flex-grow flex-col overflow-y-auto bg-D7CE7C pt-0 pb-4">
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 bg-D7CE7C px-2" aria-label="Sidebar">
          {navigation.map((item) =>
            !item.children ? (
              <div key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-D7CE7C text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  {item.name}
                </a>
              </div>
            ) : (
              <Disclosure as="div" key={item.name} className="space-y-1">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-D7CE7C text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      )}
                    >
                      <svg
                        className={classNames(
                          open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                          'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                        )}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                      {item.name}
                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-1">
                      {item.children.map((subItem) => (
                        <Disclosure.Button
                          key={subItem.name}
                          as="a"
                          href={subItem.href}
                          className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {subItem.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )
          )}
        </nav>
      </div>
    </div>
  )
}


export default QRCodeSidebar;