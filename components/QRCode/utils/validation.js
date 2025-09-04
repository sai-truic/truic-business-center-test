export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateHttpsUrl = (string) => {
  try {
    const url = new URL(string);
    // Check for HTTPS protocol
    if (url.protocol !== 'https:') {
      return false;
    }
    // Check for valid domain with extension
    const domainRegex = /^(?:www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(url.hostname);
  } catch {
    return false;
  }
};

export const validateSocialMediaUrl = (url, platform) => {
  // Trim whitespace and normalize the URL
  const cleanUrl = url.trim();
  if (!validateHttpsUrl(cleanUrl)) return false;
  
  try {
    const parsedUrl = new URL(cleanUrl);
    const hostname = parsedUrl.hostname.toLowerCase();
    
    switch(platform) {
      case 'Youtube':
        return hostname === 'youtube.com' || hostname === 'www.youtube.com' || hostname === 'youtu.be';
      case 'Twitter':
        return hostname === 'twitter.com' || hostname === 'www.twitter.com' || hostname === 'x.com' || hostname === 'www.x.com';
      case 'Instagram':
        return hostname === 'instagram.com' || hostname === 'www.instagram.com';
      case 'LinkedIn':
        return hostname === 'linkedin.com' || hostname === 'www.linkedin.com';
      case 'Facebook':
        return hostname === 'facebook.com' || hostname === 'www.facebook.com' || hostname === 'fb.com' || hostname === 'www.fb.com';
      default:
        return false;
    }
  } catch {
    return false;
  }
};
