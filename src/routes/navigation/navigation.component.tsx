'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  CartActionsContainer,
  CartBackdrop,
} from './navigation.styles';
import CartIcon from '@/components/cart-icon/cart-icon.component';
import { ReactComponent as CrwnLogo } from '@/assets/crown.svg';
import { selectCurrentUser } from '@/store/user/user.selector';
import { selectIsCartOpen } from '@/store/cart/cart.selector';
import { setIsCartOpen } from '@/store/cart/cart.action';

const Search = dynamic(() => import('@/components/search/search.component'), {
  ssr: false,
  loading: () => null,
});

const UserMenu = dynamic(() => import('@/components/user-menu/user-menu.component'), {
  loading: () => null,
});

const CartDropdown = dynamic(() => import('@/components/cart-dropdown/cart-dropdown.component'), {
  loading: () => null,
});

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartRef = useRef<HTMLDivElement>(null);

  const closeCart = useCallback(() => {
    dispatch(setIsCartOpen(false));
  }, [dispatch]);

  useOnClickOutside(cartRef, closeCart, isCartOpen);

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  return (
    <NavigationContainer>
      <LogoContainer href="/" aria-label="Crown Clothing home">
        <CrwnLogo />
      </LogoContainer>
      <NavLinks>
        <NavLink href="/shop">SHOP</NavLink>
        <Search />
        {currentUser ? (
          <UserMenu currentUser={currentUser} />
        ) : (
          <NavLink href="/auth">SIGN IN</NavLink>
        )}
        <CartActionsContainer ref={cartRef}>
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </CartActionsContainer>
      </NavLinks>
      {isCartOpen && (
        <CartBackdrop
          type="button"
          aria-label="Close cart"
          onClick={closeCart}
        />
      )}
    </NavigationContainer>
  );
};

export default Navigation;