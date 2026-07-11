import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test/test.utils';
import Category from '@/routes/category/category.component';

describe('Category tests', () => {
  test('It should render skeleton placeholders if categories are loading', () => {
    const { container } = renderWithProviders(<Category category="mens" />, {
      shopCategories: [],
    });

    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  test('It should render products if items are present', () => {
    renderWithProviders(<Category category="mens" />, {
      shopCategories: [
        {
          title: 'mens',
          imagUrl: '/mens.png',
          items: [
            { id: 1, name: 'Product 1', price: 10, imageUrl: 'https://i.ibb.co/test.png' },
            { id: 2, name: 'Product 2', price: 20, imageUrl: 'https://i.ibb.co/test.png' },
          ],
        },
      ],
    });

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();
  });
});
