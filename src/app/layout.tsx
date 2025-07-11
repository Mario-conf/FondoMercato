import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { DataProvider } from '@/context/data-provider';
import { AuthProvider } from '@/context/auth-provider';
import AppShell from '@/components/app-shell';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Fondo Mercato - Your Personal Finance Tracker',
  description: 'Take control of your finances with Fondo Mercato. Track income, manage expenses, create budgets, and achieve your financial goals with ease.',
  keywords: ['finance', 'tracker', 'budget', 'expenses', 'income', 'money', 'pwa', 'fintech'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Fondo Mercato',
  },
  openGraph: {
    type: 'website',
    url: 'https://Fondo Mercato.app', // placeholder url
    title: 'Fondo Mercato - Your Personal Finance Tracker',
    description: 'Take control of your finances with Fondo Mercato. Track income, manage expenses, create budgets, and achieve your financial goals with ease.',
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Fondo Mercato App Banner',
      },
    ],
    siteName: 'Fondo Mercato',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fondo Mercato - Your Personal Finance Tracker',
    description: 'Take control of your finances with Fondo Mercato. Track income, manage expenses, create budgets, and achieve your financial goals with ease.',
    images: ['https://placehold.co/1200x630.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#624CAB',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/fondomercatoisotipo.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
            <DataProvider>
                <AppShell>
                    {children}
                </AppShell>
                <Toaster />
            </DataProvider>
        </AuthProvider>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6Z0BHCJ1DQ"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6Z0BHCJ1DQ');
          `}
        </Script>
      </body>
    </html>
  );
}
