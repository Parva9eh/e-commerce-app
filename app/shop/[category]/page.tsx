import Category from '@/routes/category/category.component';
import { createPageMetadata } from '@/lib/metadata';

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;

  return createPageMetadata({
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Shop ${category} at Crown Clothing.`,
    path: `/shop/${category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return <Category category={category} />;
}