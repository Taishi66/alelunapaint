import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { TextContentProvider } from "@/lib/TextContentContext";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nadialuna.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nadia Luna",
  description: "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
  keywords: "Product Owner, Luxury Retail, Digital Transformation, Product Strategy, UX Design, Agile, Product Management",
  authors: [{ name: "Nadia Luna" }],
  creator: "Nadia Luna",
  publisher: "Nadia Luna",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌶️</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nadia Luna Portfolio",
    title: "Nadia Luna — Product Owner | Retail & Digital Transformation",
    description: "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
    images: [
      {
        url: `${siteUrl}/nadia.jpg`,
        width: 1200,
        height: 630,
        alt: "Nadia Luna - Product Owner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadia Luna — Product Owner",
    description: "Product Owner with 10+ years of leadership in luxury retail",
    images: [`${siteUrl}/nadia.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#0B132B' },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-brand-cream text-brand-deep antialiased">
        <TextContentProvider>
          <StructuredData />
          {children}
        </TextContentProvider>
      </body>
    </html>
  );
}
