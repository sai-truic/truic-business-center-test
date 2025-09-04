import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { X, Palette, Shirt } from 'lucide-react'

const productStyles = [
  { id: 1, name: 'Classic T-Shirt', value: 'classic' },
  { id: 2, name: 'Premium T-Shirt', value: 'premium' },
  { id: 3, name: 'V-Neck T-Shirt', value: 'vneck' },
]

const colors = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Navy', value: '#000080' },
  { name: 'Gray', value: '#808080' },
  { name: 'Red', value: '#FF0000' },
]

export const CustomizeProductLightbox = ({ isOpen, closeModal, product, onUpdateProduct }) => {
  const [selectedStyle, setSelectedStyle] = useState(productStyles[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])

  const handleUpdate = () => {
    onUpdateProduct({
      style: selectedStyle.value,
      color: selectedColor.value
    })
    closeModal()
  }

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  <span>Customize Product</span>
                  <button
                    onClick={closeModal}
                    className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </Dialog.Title>

                <div className="mt-6 space-y-6">
                  {/* Style Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Shirt className="w-4 h-4" />
                      Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {productStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style)}
                          className={`
                            px-4 py-2 rounded-lg text-sm font-medium
                            ${selectedStyle.id === style.id
                              ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                              : 'bg-gray-50 text-gray-900 border-2 border-transparent hover:bg-gray-100'
                            }
                          `}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Color
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`
                            w-10 h-10 rounded-full border-2
                            ${selectedColor.name === color.name
                              ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2'
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    onClick={handleUpdate}
                  >
                    Update Product
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomizeProductLightbox
