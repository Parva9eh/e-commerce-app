import { Suspense } from 'react';
import { vi } from 'vitest';
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from '@/utils/test/test.utils';
import Navigation from '@/routes/navigation/navigation.component';
import { signOutStart } from '@/store/user/user.action';

const mockDispatch = vi.fn();
 
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock('next/dynamic', () => ({
  default: (loader) => {
    const React = require('react');
    const LazyComponent = React.lazy(loader);

    return function DynamicComponent(props) {
      return (
        <Suspense fallback={null}>
          <LazyComponent {...props} />
        </Suspense>
      );
    };
  },
}));

const signedInUser = {
  id: 'user-1',
  displayName: 'Jane Doe',
  email: 'jane@example.com',
  createdAt: new Date('2024-01-01'),
};

describe('Navigation tests', () => {

    test('It should render a Sign In link and not a Sign Out link, if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preLoadedState: {
                user: {
                    currentUser: null,
                }
            }
        });

        const signOutLinkElement = screen.queryByText(/sign out/i);
        expect(signOutLinkElement).toBeNull();

        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();

    });

    test('It should render the user menu and not a Sign In link, if there is a currentUser', async () => {
        renderWithProviders(<Navigation />, {
            preLoadedState: {
                user: {
                    currentUser: signedInUser,
                }
            }
        });

        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();

        await waitFor(() => {
          expect(screen.getByText(/hi, jane doe/i)).toBeInTheDocument();
        });
        expect(screen.getByText(/signed in/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /account menu for jane doe/i })).toBeInTheDocument();
    });

    test('It should not render the cart dropdown, if isCartOpen is false', () => {
        renderWithProviders(<Navigation />, {
            preLoadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        });

        const dropDownTextElement = screen.queryByText(/your cart is empty/i);
        expect(dropDownTextElement).toBeNull();

    });

    test('It should render the cart dropdown, if isCartOpen is true', async () => {
        renderWithProviders(<Navigation />, {
            preLoadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        });

        await waitFor(() => {
          expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        });

    });

    test('It should dispatch signOutStart action when clicking Sign out in the user menu', async () => {

        renderWithProviders(<Navigation />, {
            preLoadedState: {
                user: {
                    currentUser: signedInUser,
                },
            },
        });

        const accountButton = await screen.findByRole('button', { name: /account menu for jane doe/i });
        fireEvent.click(accountButton);
        fireEvent.click(screen.getByRole('menuitem', { name: /sign out/i }));

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(signOutStart());

        mockDispatch.mockClear();
      });
});