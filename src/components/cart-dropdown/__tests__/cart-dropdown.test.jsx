import { vi } from 'vitest';
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from '@/utils/test/test.utils';
import CartDropdown from '@/components/cart-dropdown/cart-dropdown.component';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Cart Dropdown tests', () => {

    test('It should render empty message if no products are present', () => {
        renderWithProviders(<CartDropdown />, {
            preLoadedState: {
                cart: {
                    cartItems: [],
                },
          },
        });

        const emptyMessageElement = screen.getByText(/your cart is empty/i);
        expect(emptyMessageElement).toBeInTheDocument();
    });

    test('It should render items in dropdown if items are present', () => {
        renderWithProviders(<CartDropdown />, {
            preLoadedState: {
                cart: {
                    cartItems: [
                        { id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1 },
                        { id: 2, name: 'Item B', imageUrl: 'test', price: 20, quantity: 2 },
                    ],
                },
          },
        });

        const emptyMessageElement = screen.queryByText(/your cart is empty/i);
        expect(emptyMessageElement).toBeNull();
        expect(screen.getByText('Item A')).toBeInTheDocument();
        expect(screen.getByText('Item B')).toBeInTheDocument();
    });

    test('Go to checkout button should navigate to checkout page', () => {
        renderWithProviders(<CartDropdown />, {
          preLoadedState: {
            cart: {
              cartItems: [],
            },
          },
        });
    
        const button = screen.queryByRole('button');
        fireEvent.click(button);
        expect(mockPush).toHaveBeenCalledWith('/checkout');
        
        mockPush.mockClear();
      });
});