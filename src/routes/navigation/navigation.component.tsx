'use client';

import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, LogoContainer, NavLinks, NavLink, SignOutButton } from './navigation.styles';
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
    <Fragment>
      <NavigationContainer>
        <LogoContainer href="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink href="/shop">SHOP</NavLink>
          {currentUser ? (
            <SignOutButton onClick={signOutUser}>SIGN OUT</SignOutButton>
          ) : (
            <NavLink href="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
    </Fragment>
  );
};

export default Navigation;