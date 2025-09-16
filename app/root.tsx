import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dineshkumar Devchand Shah" />
        <meta name="keywords" content="Dr Vibha Shah, biography, Kenya, pharmacy, accounting, FCCA, MBA, In Quest of Knowledge, Nairobi, Cardiff University, Oshwal community" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="In Quest of Knowledge" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="/images/cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="In Quest of Knowledge - A Biography of Dr. Vibha Dineshkumar Shah" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/cover.jpg" />
        <meta name="twitter:image:alt" content="In Quest of Knowledge - A Biography of Dr. Vibha Dineshkumar Shah" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            "name": "In Quest of Knowledge",
            "author": {
              "@type": "Person",
              "name": "Dineshkumar Devchand Shah"
            },
            "about": {
              "@type": "Person",
              "name": "Dr. Vibha Dineshkumar Shah",
              "description": "Late Dr Vibha Dineshkumar Shah - MPharm, FCCA, MBA"
            },
            "description": "A compelling biography of Late Dr. Vibha Dineshkumar Shah - MPharm, FCCA, MBA. Her extraordinary journey from Nairobi to Cardiff and beyond.",
            "isbn": ["978-9914-35-124-8", "978-9914-35-125-5"],
            "publisher": {
              "@type": "Organization",
              "name": "Dineshkumar Devchand Shah",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "Kenya",
                "postalCode": "00606"
              }
            },
            "datePublished": "2025-08",
            "inLanguage": "en",
            "genre": "Biography",
            "bookFormat": "https://schema.org/Paperback",
            "image": "/images/cover.jpg",
            "url": "https://www.inquestofknowledge.com",
            "offers": [
              {
                "@type": "Offer",
                "price": "2500",
                "priceCurrency": "KES",
                "availability": "https://schema.org/InStock",
                "description": "Paperback Edition"
              },
              {
                "@type": "Offer",
                "price": "3500",
                "priceCurrency": "KES",
                "availability": "https://schema.org/InStock",
                "description": "Hardback Edition"
              }
            ]
          })}
        </script>
        
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-br from-primary-50 to-gold-50 min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
