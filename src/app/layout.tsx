import { theme } from '@/shared/ui/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Upjet Test',
  description: 'Тестовое задание для компании Upjet',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body className={roboto.className}>
        <NuqsAdapter>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
