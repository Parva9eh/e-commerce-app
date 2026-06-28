import type { Metadata } from 'next';
import Providers from '@/providers/providers';
import Navigation from '@/routes/navigation/navigation.component';
import PageContainer from '@/components/page-container/page-container.component';
import Footer from '@/components/footer/footer.component';
import { getCategories } from '@/lib/categories';

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
  const categories = await getCategories();

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
        <Providers initialCategories={categories}>
          <Navigation />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}