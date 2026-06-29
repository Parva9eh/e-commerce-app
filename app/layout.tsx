import type { Metadata } from 'next';
import Script from 'next/script';
import { openSansCondensed, openSansCondensedBold } from '@/lib/fonts';
import { SUPPRESS_FAST_REFRESH_LOGS_SCRIPT } from '@/lib/dev/suppress-fast-refresh-logs';
import Providers from '@/providers/providers';
import Navigation from '@/routes/navigation/navigation.component';
import PageContainer from '@/components/page-container/page-container.component';
import Footer from '@/components/footer/footer.component';
export const metadata: Metadata = {
  title: 'Crown Clothing',
  description: 'Modern e-commerce shop',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/crwn-192x192.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSansCondensed.variable}>
      {process.env.NODE_ENV === 'development' && (
        <Script id="suppress-fast-refresh-logs" strategy="beforeInteractive">
          {SUPPRESS_FAST_REFRESH_LOGS_SCRIPT}
        </Script>
      )}
      <body className={openSansCondensed.className}>
        <Providers>
          <Navigation />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}