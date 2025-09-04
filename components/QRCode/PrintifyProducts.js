import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader, Settings } from 'lucide-react';
import html2canvas from 'html2canvas';
import { CustomizeProductLightbox } from './CustomizeProductLightbox';

export const PrintifyProducts = ({ qrCodeRef }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (document.getElementById('QRCode')) {
      createProduct();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      // Add cache-busting timestamp to prevent 304s
      const response = await fetch(`/api/printify/get-products?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    }
  };

  const createProduct = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Starting product creation process...');
      
      // Check if QR code element exists
      const qrCodeElement = document.getElementById('QRCode');
      if (!qrCodeElement) {
        throw new Error('QR code element not found');
      }
      
      // Capture QR code as image
      console.log('Capturing QR code as image...');
      const canvas = await html2canvas(qrCodeElement);
      const qrCodeImage = canvas.toDataURL('image/png');
      console.log('QR code captured successfully');
      
      // Upload QR code image
      console.log('Uploading QR code to Printify...');
      const uploadResponse = await fetch('/api/printify/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeImage })
      });
      
      const uploadResult = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        console.error('Upload failed:', uploadResult);
        throw new Error('Failed to upload QR code image');
      }

      console.log('Upload successful:', uploadResult);
      const { image_id, upload_details } = uploadResult;
      console.log('Image details:', upload_details);

      // Create product with the uploaded image
      console.log('Creating Printify product with image_id:', image_id);
      const createResponse = await fetch('/api/printify/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_id })
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create product');
      }

      // Refresh products list
      await fetchProducts();
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error('Error creating product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={createProduct}
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
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <ShoppingBag className="w-5 h-5" />
        )}
        <span>{isLoading ? 'Creating Product...' : 'Create Product with QR Code'}</span>
      </motion.button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="qr-product-card group"
          >
            <button
              onClick={() => {
                setSelectedProduct(product);
                setIsCustomizeOpen(true);
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
              title="Customize Product"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.images[0]?.src}
                alt={product.title}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="qr-product-content">
              <h3 className="qr-product-title">{product.title}</h3>
              <p className="qr-product-description">{product.description}</p>
              <div className="qr-product-footer">
                <span className="qr-product-price">${product.price}</span>
                <a
                  href={product.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qr-view-button"
                >
                  View Product
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <CustomizeProductLightbox
        isOpen={isCustomizeOpen}
        closeModal={() => setIsCustomizeOpen(false)}
        product={selectedProduct}
        onUpdateProduct={async (customization) => {
          if (selectedProduct) {
            // Here you would call your API to update the product with the new customization
            console.log('Updating product with:', customization);
            // Refresh products after update
            await fetchProducts();
          }
        }}
      />
    </div>
  );
};

export default PrintifyProducts;
