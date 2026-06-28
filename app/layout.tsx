import type { Metadata } from 'next';
import Providers from '@/providers/providers';
import Navigation from '@/routes/navigation/navigation.component';
import PageContainer from '@/components/page-container/page-container.component';

export const metadata: Metadata = {
  title: 'Crown Clothing',
  description: 'Modern e-commerce shop',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Navigation />
          <PageContainer>{children}</PageContainer>
        </Providers>
      </body>
    </html>
  );
}