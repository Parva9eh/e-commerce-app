import type { Metadata } from 'next';
import { openSansCondensed } from '@/lib/fonts';
import Providers from '@/providers/providers';
import Navigation from '@/routes/navigation/navigation.component';
import PageContainer from '@/components/page-container/page-container.component';
import Footer from '@/components/footer/footer.component';
import { getCategories } from '@/lib/categories';
import { Category } from '@/store/categories/category.types';

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
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to prefetch categories during render:', error);
  }

  return (
    <html lang="en" className={openSansCondensed.className}>
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