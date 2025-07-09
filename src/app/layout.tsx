import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { DataProvider } from '@/context/data-provider';
import { AuthProvider } from '@/context/auth-provider';
import AppShell from '@/components/app-shell';

export const metadata: Metadata = {
  title: 'Fondo Mercato - Your Personal Finance Tracker',
  description: 'Take control of your finances with Fondo Mercato. Track income, manage expenses, create budgets, and achieve your financial goals with ease.',
  keywords: ['finance', 'tracker', 'budget', 'expenses', 'income', 'money', 'pwa', 'fintech'],
  manifest: '/manifest.json',
  themeColor: '#624CAB',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
      </body>
    </html>
  );
}
