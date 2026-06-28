import { notFound } from 'next/navigation';
import ProductDetail from '@/routes/product/product-detail.component';
import { createPageMetadata } from '@/lib/metadata';
import { getCategories } from '@/lib/categories';

type ProductPageProps = {
  params: Promise<{ category: string; productId: string }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { category, productId } = await params;
  const categories = await getCategories();
  const products = categories.find((item) => item.title.toLowerCase() === category.toLowerCase())?.items ?? [];
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return createPageMetadata({
      title: 'Product',
      description: 'Product not found at Crown Clothing.',
      path: `/shop/${category}/${productId}`,
    });
  }

  return createPageMetadata({
    title: product.name,
    description: `Shop ${product.name} in our ${category} collection.`,
    path: `/shop/${category}/${productId}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, productId } = await params;
  const categories = await getCategories();
  const products = categories.find((item) => item.title.toLowerCase() === category.toLowerCase())?.items ?? [];
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} category={category} />;
}