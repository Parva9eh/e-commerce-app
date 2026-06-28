import { getAdminFirestore } from '@/lib/firebase-admin';
import { Category, CategoryItem } from '@/store/categories/category.types';

export type CartLineInput = {
  id: number;
  quantity: number;
};

export type ValidatedCartLine = CategoryItem & {
  quantity: number;
};

export type ValidatedCart = {
  items: ValidatedCartLine[];
  totalCents: number;
  totalDollars: number;
};

export const getCatalogCategories = async (): Promise<Category[]> => {
  const snapshot = await getAdminFirestore().collection('categories').get();

  return snapshot.docs.map((doc) => doc.data() as Category);
};

export const buildCatalogIndex = (categories: Category[]): Map<number, CategoryItem> => {
  const index = new Map<number, CategoryItem>();

  for (const category of categories) {
    for (const item of category.items) {
      index.set(item.id, item);
    }
  }

  return index;
};

export const validateAndPriceCartLines = (
  lines: CartLineInput[],
  catalog: Map<number, CategoryItem>,
): ValidatedCart => {
  if (!Array.isArray(lines) || !lines.length) {
    throw new Error('Cart is empty');
  }

  const items: ValidatedCartLine[] = [];
  let totalCents = 0;

  for (const line of lines) {
    const id = Number(line.id);
    const quantity = Number(line.quantity);

    if (
      !Number.isInteger(id) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      throw new Error('Invalid cart line');
    }

    const product = catalog.get(id);

    if (!product) {
      throw new Error(`Unknown product: ${id}`);
    }

    const unitCents = Math.round(product.price * 100);
    totalCents += unitCents * quantity;

    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
  }

  if (totalCents < 50) {
    throw new Error('Order total is below the minimum charge');
  }

  return {
    items,
    totalCents,
    totalDollars: totalCents / 100,
  };
};

export const validateCartFromRequest = async (
  lines: CartLineInput[],
): Promise<ValidatedCart> => {
  const categories = await getCatalogCategories();
  const catalog = buildCatalogIndex(categories);

  return validateAndPriceCartLines(lines, catalog);
};