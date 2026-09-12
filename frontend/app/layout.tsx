import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'APIHub — Your APIs. One Hub.',
  description: 'Build, test, automate, mock, document, and monitor APIs in one unified workspace. The complete API engineering platform for developers.',
  keywords: ['API', 'API development', 'API testing', 'API monitoring', 'API documentation', 'API mocking', 'REST API', 'developer tools'],
  authors: [{ name: 'APIHub' }],
  creator: 'APIHub',
  publisher: 'APIHub',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apihub.dev',
    title: 'APIHub — Your APIs. One Hub.',
    description: 'Build, test, automate, mock, document, and monitor APIs in one unified workspace.',
    siteName: 'APIHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APIHub — Your APIs. One Hub.',
    description: 'Build, test, automate, mock, document, and monitor APIs in one unified workspace.',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}