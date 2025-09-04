import './globals.css'
import Providers from './providers'
import Script from 'next/script'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://howtostartanllc.com/'),
  title: {
    default: 'Small Business Center by TRUiC | #1 Resource for Entrepreneurs',
    template: '%s | TRUiC Small Business Center - Expert Tools & Guidance'
  },
  description: "TRUiC's Small Business Center offers the most comprehensive suite of tools and expert resources for entrepreneurs. From LLC formation to growth strategies, we're your one-stop solution for business success in [Your City]. Trusted by thousands of local businesses.",
  keywords: ['small business tools', 'LLC formation', 'operating agreement generator', 'business courses', 'entrepreneurship resources', 'startup guidance', 'legal documents for business', 'TRUIC', 'small business center', 'business formation', 'entrepreneur resources', 'small business guide', 'LLC creation', 'business planning', 'startup tools', '[Your City] business resources'],
  authors: [{ name: 'TRUIC Team', url: 'https://howtostartanllc.com/about-us' }],
  creator: 'TRUIC',
  publisher: 'TRUIC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'TRUiC Small Business Center | #1 Resource for Entrepreneurs',
    description: 'Access the most comprehensive suite of expert-curated tools and resources for small businesses. From LLC formation to growth strategies, TRUiC is your ultimate partner in business success.',
    url: 'https://business.howtostartanllc.com/',
    siteName: 'TRUiC Small Business Center',
    images: [
      {
        url: 'https://www.truic.com/business_center_og_image.jpg',
        width: 1200,
        height: 630,
        alt: 'TRUiC Small Business Center - Your #1 Resource for Business Success',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRUiC Small Business Center | #1 Resource for Entrepreneurs',
    description: 'Discover the most comprehensive suite of tools and expert resources for small businesses. From LLC formation to growth strategies, TRUiC is your ultimate partner in business success.',
    images: ['https://www.truic.com/business_center_og_image.jpg'],
    creator: '@TRUIC',
    site: '@TRUIC',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://business.howtostartanllc.com/',
    languages: {
      'en-US': 'https://business.howtostartanllc.com/'
    },
  },
  category: 'Business',
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  other: {
    'msvalidate.01': 'bing-verification-code',
    datePublished: '2023-01-01',
    dateModified: '2023-06-15',
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "TRUiC Small Business Center",
      "url": "https://business.howtostartanllc.com/",
      "logo": "https://www.truic.com/logo.png",
      "image": "https://www.truic.com/business-center-image.jpg",
      "description": "The #1 resource for entrepreneurs in [Your City], offering comprehensive tools and expert guidance for small business success, from LLC formation to growth strategies.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Business St",
        "addressLocality": "[Your City]",
        "addressRegion": "[Your State]",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "telephone": "+1-234-567-8900",
      "sameAs": [
        "https://www.facebook.com/TRUIC",
        "https://twitter.com/TRUIC",
        "https://www.linkedin.com/company/truic"
      ]
    })
  },
}

export async function generateStaticParams() {
  return [
    { slug: 'features' },
    { slug: 'services' },
    { slug: 'why-choose-us' },
    { slug: 'contact' },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="storage-fix"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Clear existing Clerk telemetry from localStorage
                Object.keys(localStorage).forEach(key => {
                  if (key.startsWith('clerk_telemetry') || key.includes('telemetry') || 
                      (key.includes('clerk') && key.includes('throttler'))) {
                    localStorage.removeItem(key);
                  }
                });
                
                // Create backup storage using cookies
                const localStorageProxy = {
                  setItem: function(key, value) {
                    try {
                      if (key && key.toString().includes('clerk_telemetry')) {
                        document.cookie = key + "=" + encodeURIComponent(value) + ";path=/;max-age=3600";
                        return;
                      }
                      localStorage.setItem(key, value);
                    } catch(e) {
                      console.warn('Storage error:', e);
                      document.cookie = key + "=" + encodeURIComponent(value) + ";path=/;max-age=86400";
                    }
                  },
                  getItem: function(key) {
                    try {
                      if (key && key.toString().includes('clerk_telemetry')) {
                        const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
                        return match ? decodeURIComponent(match[2]) : null;
                      }
                      return localStorage.getItem(key);
                    } catch(e) {
                      console.warn('Storage error:', e);
                      const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
                      return match ? decodeURIComponent(match[2]) : null;
                    }
                  }
                };

                // Override localStorage for telemetry
                const originalSetItem = localStorage.setItem;
                localStorage.setItem = function(key, value) {
                  if (key && key.toString().includes('clerk_telemetry')) {
                    localStorageProxy.setItem(key, value);
                  } else {
                    try {
                      originalSetItem.call(localStorage, key, value);
                    } catch(e) {
                      if (e.name === 'QuotaExceededError') {
                        localStorageProxy.setItem(key, value);
                      }
                    }
                  }
                };
              } catch(e) {
                console.warn('Storage setup error:', e);
              }
            `
          }}
        />
      </head>
      <body className='font-[Karla]'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
