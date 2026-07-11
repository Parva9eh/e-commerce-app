import { cache } from 'react';
import { fetchPublicCategories } from '@/lib/catalog-fetch';
import { MAX_CART_LINE_QTY, MIN_ORDER_CENTS } from '@/lib/cart-limits';
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

const CATALOG_CACHE_TTL_MS = 5 * 60 * 1000;

type CatalogCacheEntry = {
  categories: Category[];
  expiresAt: number;
};

let catalogCache: CatalogCacheEntry | null = null;

export const clearCatalogCache = (): void => {
  catalogCache = null;
};

const toPlainCategoryItems = (raw: Category[]): Category[] =>
  raw.map((category) => ({
    title: String(category?.title ?? ''),
    imagUrl: String(category?.imagUrl ?? ''),
    items: (category?.items ?? []).map((item) => ({
      id: Number(item.id),
      name: String(item.name ?? ''),
      price: Number(item.price),
      imageUrl: String(item.imageUrl ?? ''),
    })),
  }));

/**
 * Public catalog read for server pricing.
 * Uses the client Firebase SDK (NEXT_PUBLIC_* only) so payment routes do not
 * load firebase-admin. Prices are public; we still recompute totals server-side
 * so clients cannot set their own amounts.
 */
const fetchCatalogCategories = async (): Promise<Category[]> => {
  const categories = await fetchPublicCategories();
  return toPlainCategoryItems(categories);
};

export const getCatalogCategories = async (): Promise<Category[]> => {
  const now = Date.now();

  if (catalogCache && now < catalogCache.expiresAt) {
    return catalogCache.categories;
  }

  const categories = await fetchCatalogCategories();
  catalogCache = {
    categories,
    expiresAt: now + CATALOG_CACHE_TTL_MS,
  };

  return categories;
};

/** Request-scoped + TTL-backed catalog for Server Components and route handlers. */
export const getCachedCatalogCategories = cache(async (): Promise<Category[]> => {
  return getCatalogCategories();
});

export const buildCatalogIndex = (categories: Category[]): Map<number, CategoryItem> => {
  const index = new Map<number, CategoryItem>();

  for (const category of categories) {
    for (const item of category.items) {
      index.set(item.id, item);
    }
  }

  return index;
};

/** Merge duplicate product ids so quantity is summed before validation. */
export const mergeCartLineInputs = (lines: CartLineInput[]): CartLineInput[] => {
  const merged = new Map<number, number>();

  for (const line of lines) {
    const id = Number(line.id);
    const quantity = Number(line.quantity);
    merged.set(id, (merged.get(id) ?? 0) + quantity);
  }

  return Array.from(merged.entries()).map(([id, quantity]) => ({ id, quantity }));
};

export const validateAndPriceCartLines = (
  lines: CartLineInput[],
  catalog: Map<number, CategoryItem>,
): ValidatedCart => {
  if (!Array.isArray(lines) || !lines.length) {
    throw new Error('Cart is empty');
  }

  const mergedLines = mergeCartLineInputs(lines);
  const items: ValidatedCartLine[] = [];
  let totalCents = 0;

  for (const line of mergedLines) {
    const id = Number(line.id);
    const quantity = Number(line.quantity);

    if (
      !Number.isInteger(id) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_CART_LINE_QTY
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

  if (totalCents < MIN_ORDER_CENTS) {
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
