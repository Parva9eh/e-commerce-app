import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../navigation.component";

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

    test('It should render a Sign Out link and not a Sign In link, if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
            preLoadedState: {
                user: {
                    currentUser: {},
                }
            }
        });

        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();
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

    test('It should render the cart dropdown, if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
            preLoadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        });

        const dropDownTextElement = screen.getByText(/your cart is empty/i);
        expect(dropDownTextElement).toBeInTheDocument();

    });
});
