'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  SignOutButton,
  CartActionsContainer,
} from './navigation.styles';
import CartIcon from '@/components/cart-icon/cart-icon.component';
import CartDropdown from '@/components/cart-dropdown/cart-dropdown.component';
import { signOutStart } from '@/store/user/user.action';
import { ReactComponent as CrwnLogo } from '@/assets/crown.svg';
import { selectCurrentUser } from '@/store/user/user.selector';
import { selectIsCartOpen } from '@/store/cart/cart.selector';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart());

  return (
    <NavigationContainer>
      <LogoContainer href="/" aria-label="Crown Clothing home">
        <CrwnLogo />
      </LogoContainer>
      <NavLinks>
        <NavLink href="/shop">SHOP</NavLink>
        {currentUser ? (
          <SignOutButton type="button" onClick={signOutUser}>
            SIGN OUT
          </SignOutButton>
        ) : (
          <NavLink href="/auth">SIGN IN</NavLink>
        )}
        <CartActionsContainer>
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </CartActionsContainer>
      </NavLinks>
    </NavigationContainer>
  );
};

export default Navigation;