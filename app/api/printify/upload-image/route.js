import { Buffer } from 'buffer';
import QRCode from 'qrcode';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('Starting Printify image upload process...');

  try {
    const { qrCodeImage } = await request.json();
    console.log('Received QR code image data');
    
    // The QR code image is already in base64 format from html2canvas
    const base64Image = qrCodeImage.split(',')[1];
    console.log('Base64 image extracted successfully');

    const requestBody = {
      file_name: 'qr-code.png',
      contents: base64Image
    };
    console.log('Preparing upload request with file name:', requestBody.file_name);

    // Upload to Printify
    console.log('Sending upload request to Printify API...');
    const uploadResponse = await fetch('https://api.printify.com/v1/uploads/images.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Received response from Printify API');
    const uploadData = await uploadResponse.json();
    console.log('Upload response data:', uploadData);

    if (!uploadResponse.ok) {
      console.error('Upload failed:', uploadData);
      throw new Error(uploadData.message || 'Failed to upload image');
    }

    console.log('Image upload successful!', {
      image_id: uploadData.id,
      file_name: uploadData.file_name,
      height: uploadData.height,
      width: uploadData.width,
      size: uploadData.size
    });

    return NextResponse.json({ 
      image_id: uploadData.id,
      upload_details: {
        file_name: uploadData.file_name,
        height: uploadData.height,
        width: uploadData.width,
        size: uploadData.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Failed to upload image', error: error.message }, { status: 500 });
  }
}