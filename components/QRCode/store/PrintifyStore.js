import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Shirt, QrCode } from 'lucide-react';

export const PrintifyStore = ({ qrCodeData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const createTShirtProduct = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Upload QR code image
      const uploadResponse = await fetch('/api/printify/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeData })
      });
      
      const { image_id } = await uploadResponse.json();
      
      // Step 2: Create product with uploaded image
      const createResponse = await fetch('/api/printify/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_id })
      });
      
      const productData = await createResponse.json();
      setProduct(productData);
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error('Error creating product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          Create QR Code T-Shirt
        </h2>
      </div>

      {!product && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={createTShirtProduct}
          disabled={isLoading}
          className={`
            w-full py-4 px-6
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white rounded-xl
            hover:from-indigo-700 hover:to-purple-700
            transition-all duration-300
            font-semibold shadow-lg hover:shadow-xl
            flex items-center justify-center gap-3
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          <Shirt className="w-5 h-5" />
          <span>{isLoading ? 'Creating Product...' : 'Create T-Shirt with QR Code'}</span>
        </motion.button>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {product && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
              <QrCode className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-500">Your custom QR code t-shirt is ready!</p>
            </div>
          </div>

          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[0].src}
              alt="Product preview"
              className="qr-product-image"
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-medium text-gray-900">${product.price}</div>
            <a
              href={product.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View in Store
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PrintifyStore;
