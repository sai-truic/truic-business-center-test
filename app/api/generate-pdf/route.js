import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);
    
    const response = await fetch('https://truicpdfgenerators.azurewebsites.net/api/OperatingAgreement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`External API error: ${response.status}, ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/pdf')) {
      const pdfBuffer = await response.arrayBuffer();
      
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=operating_agreement.pdf',
        },
      });
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response from external API: ${contentType}, ${text}`);
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: `Error generating PDF: ${error.message}` },
      { status: 500 }
    );
  }
}