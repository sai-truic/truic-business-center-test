import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X } from 'lucide-react'

export const ExamplesLightbox = ({ isOpen, closeModal, title, description, examples, onSelect }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 text-left align-middle shadow-xl transition-all border-2 border-orange-200 hover:border-[#F7931E] duration-300">
                <Dialog.Title as="div" className="flex items-center justify-between">
                  <h3 className="text-lg font-bold leading-6 text-neutral-950 bg-clip-text text-transparent bg-gradient-to-r from-[#F7931E] to-orange-600">
                    {title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="rounded-full p-1.5 text-[#F7931E] hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                {description && (
                  <p className="mt-2 text-sm text-gray-600 font-medium tracking-wide">
                    {description}
                  </p>
                )}

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {examples.map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSelect(example);
                          closeModal();
                        }}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white hover:bg-orange-50 hover:text-[#F7931E] rounded-xl transition-all duration-300 border-2 border-orange-200 hover:border-[#F7931E] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ExamplesLightbox
