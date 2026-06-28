'use client';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  CartActionsContainer,
} from './navigation.styles';
import Search from '@/components/search/search.component';
import CartIcon from '@/components/cart-icon/cart-icon.component';
import CartDropdown from '@/components/cart-dropdown/cart-dropdown.component';
import UserMenu from '@/components/user-menu/user-menu.component';
import { ReactComponent as CrwnLogo } from '@/assets/crown.svg';
import { selectCurrentUser } from '@/store/user/user.selector';
import { selectIsCartOpen } from '@/store/cart/cart.selector';
import { setIsCartOpen } from '@/store/cart/cart.action';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const cartRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(cartRef, () => {
    if (isCartOpen) dispatch(setIsCartOpen(false));
  });

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
    </NavigationContainer>
  );
};

export default Navigation;