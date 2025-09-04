import { NextResponse } from 'next/server';

// Helper function to process a batch of domain extensions
async function processDomainBatch(batchExtensions, baseName) {
  // Create an array of promises for each domain check
  const promises = batchExtensions.map(async (ext) => {
    const domainName = `${baseName.toLowerCase()}${ext}`;
    const url = `https://1.1.1.1/dns-query?name=${domainName}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'accept': 'application/dns-json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { domain: domainName, data };
    } catch (error) {
      console.error(`Error fetching domain ${domainName}:`, error);
      return { domain: domainName, error: true };
    }
  });

  // Wait for all promises to resolve
  return Promise.all(promises);
}

export async function POST(request) {
  try {
    const { baseName, extensions, service = 'Domain Service' } = await request.json();
    
    if (!baseName || !extensions || !Array.isArray(extensions)) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const fullReplyContent = baseName;
    const batchSize = 9;
    
    // Split extensions into batches of 9
    const extensionBatches = [];
    for (let i = 0; i < extensions.length; i += batchSize) {
      extensionBatches.push(extensions.slice(i, i + batchSize));
    }
    
    // Process all batches concurrently
    const batchPromises = extensionBatches.map(batch => 
      processDomainBatch(batch, fullReplyContent)
    );
    
    const batchResults = await Promise.all(batchPromises);
    
    // Flatten batch results
    const results = batchResults.flat();
    
    // Process the responses
    const availableExtensions = [];
    let allUnavailable = true;
    
    for (const result of results) {
      if (result.error) continue;
      
      const status = result.data.Status;
      if (status === 3) { // Status 3 indicates NXDOMAIN (domain doesn't exist)
        const domain = result.domain;
        const extension = domain.replace(fullReplyContent.toLowerCase(), '');
        availableExtensions.push(extension);
        allUnavailable = false;
      }
    }
    
    // Prepare the response message
    let responseMessage;
    if (allUnavailable) {
      responseMessage = `${service} - All extensions unavailable.\nName: ${fullReplyContent}`;
    } else {
      responseMessage = `${service} - The following domains are available: ${fullReplyContent.toLowerCase()}: ${availableExtensions}.\nBusiness Name: ${fullReplyContent}\nFunction Name: domain-availability-api`;
    }
    
    console.log(responseMessage);
    
    return NextResponse.json({ 
      message: responseMessage,
      availableExtensions,
      allUnavailable,
      baseName: fullReplyContent
    });
    
  } catch (error) {
    console.error(`Error processing domains: ${error.message}`);
    return NextResponse.json(
      { error: "An error occurred while processing domains" },
      { status: 500 }
    );
  }
}