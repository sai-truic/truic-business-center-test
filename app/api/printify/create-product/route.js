import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { image_id } = await request.json();
    const shopId = process.env.PRINTIFY_SHOP_ID;
    const MAX_ENABLED_VARIANTS = 100;

    // First get the variants
    console.log('Fetching variants...');
    const variantsResponse = await fetch(
      `https://api.printify.com/v1/catalog/blueprints/5/print_providers/39/variants.json`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!variantsResponse.ok) {
      throw new Error('Failed to fetch variants');
    }

    const variantsData = await variantsResponse.json();
    console.log(`Retrieved ${variantsData.variants.length} variants`);
    
    // Process variants with limit on enabled ones
    const variants = [];
    const variant_ids = [];
    let enabledCount = 0;
    
    variantsData.variants.forEach(variant => {
      const variant_id = variant.id;
      if (variant_id) {
        const is_enabled = enabledCount < MAX_ENABLED_VARIANTS;
        variants.push({
          id: variant_id,
          price: 2499,
          is_enabled: is_enabled
        });
        variant_ids.push(variant_id);
        if (is_enabled) enabledCount++;
      }
    });

    console.log(`Processing ${enabledCount} enabled variants out of ${variants.length} total variants`);

    const productData = {
      title: "Custom QR Code T-Shirt",
      description: "High-quality t-shirt featuring a custom QR code design",
      blueprint_id: 5,
      print_provider_id: 39,
      variants: variants,
      print_areas: [
        {
          variant_ids: variant_ids,
          placeholders: [
            {
              position: "front",
              images: [
                {
                  id: image_id,
                  x: 0.5,
                  y: 0.5,
                  scale: 1,
                  angle: 0
                }
              ]
            }
          ]
        }
      ],
      tags: ["custom", "qr code", "t-shirt"]  // Added tags
    };

    console.log('Creating product...');
    const createResponse = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      }
    );

    const createResponseData = await createResponse.json();
    
    if (!createResponse.ok) {
      console.error('Product creation failed:', {
        status: createResponse.status,
        data: createResponseData
      });
      throw new Error(createResponseData.message || 'Failed to create product');
    }

    console.log('Product created successfully, publishing...');
    
    // Added publishData with all required fields
    // Modified publishData to use boolean values
    const publishData = {
      title: true,
      description: true,
      variants: true,
      images: true,
      tags: true
    };

    const publishResponse = await fetch(
      `https://api.printify.com/v1/shops/${shopId}/products/${createResponseData.id}/publish.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(publishData)
      }
    );

    const publishResponseData = await publishResponse.json();

    if (!publishResponse.ok) {
      console.error('Publishing failed:', {
        status: publishResponse.status,
        data: publishResponseData
      });
      throw new Error(publishResponseData.message || 'Failed to publish product');
    }

    console.log('Product published successfully');
    return NextResponse.json(createResponseData);

  } catch (error) {
    console.error('Operation failed:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({ 
      message: 'Failed to create or publish product', 
      error: error.message 
    }, { status: 500 });
  }
}