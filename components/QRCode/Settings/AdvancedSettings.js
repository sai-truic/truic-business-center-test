
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { QRInput } from '../QRForms/QRInput'

export const AdvancedSettings = ({ handleInputChange }) => {
    
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 py-4 text-left hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <ChevronDownIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-[#F7931E]`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-neutral-950">Advanced Settings</h3>
                                <p className="text-sm text-gray-600 mt-0.5 font-medium tracking-wide">Fine-tune QR code appearance</p>
                            </div>
                        </div>
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className="mt-4 bg-white rounded-xl shadow-lg p-6 space-y-6">
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl shadow-lg border-2 border-orange-200 hover:border-[#F7931E] transition-all duration-300">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="col-span-1 sm:col-span-1">
                                        <QRInput label={"Size (px)"} type={'text'} name={"Size"} placeholder={"256"} handleInputChange={handleInputChange} />
                                    </div>
                                    <div className="col-span-1 sm:col-span-1">
                                        <QRInput label={"Background Color"} type={'color'} name={"BgColor"} placeholder={""} handleInputChange={handleInputChange} />
                                    </div>
                                    <div className="col-span-1 sm:col-span-1">
                                        <QRInput label={"Foreground Color"} type={'color'} name={"FgColor"} placeholder={""} handleInputChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}


export default AdvancedSettings;
