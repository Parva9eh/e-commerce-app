import { screen } from "@testing-library/react";
import { renderWithProviders } from '@/utils/test/test.utils';
import Category from '@/routes/category/category.component';

describe('Category tests', () => {

    test('It should render a Spinner if isLoading is true', () => {
        renderWithProviders(<Category category="mens" />, {
            preLoadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        });

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();

    });

    test('It should render products if isLoading is false and there are items present', () => {
        renderWithProviders(<Category category="mens" />, {
            preLoadedState: {
                categories: {
                    isLoading: false,
                    categories: [{
                        title: 'mens',
                        items: [
                            {id: 1, name: 'Product 1'},
                            {id: 2, name: 'Product 2'}
                        ]
                    }]
                }
            }
        });

    const spinnerElement = screen.queryByText('spinner');
    expect(spinnerElement).toBeNull();

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();

    });

})