import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { Bars4Icon } from '@heroicons/react/24/solid';
import { QRCodeSidebar} from './QRCodeSidebar';

export const SlideOver = () => {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
    <div className="sticky py-10 flex items-center justify-left px-6">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-orange px-4 py-2 text-sm text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Bars4Icon className="w-6 h-6 inline-block mr-2" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed bg-transparent" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto w-[600px] md:w-[600px] sm:w-[600px]">
            <div className="flex flex-grow items-center justify-center p-0 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full object-contain rounded-2xl min-h-screen max-w-md transform bg-light-green p-12 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex flex-row leading-6 justify-around"
                  >
                    <div className='font-bold text-lg text-indigo-600'>QR Code Generator</div>
                    <button
                      type="button"
                      className="rounded-md border border-transparent ml-16 bg-orange text-right align-right  px-4 py-1 text-sm font-bold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                        X
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <QRCodeSidebar />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


export default SlideOver;