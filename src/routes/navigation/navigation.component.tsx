import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { signOutStart } from '../../store/user/user.action'; 
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart());
  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          {
            currentUser ? (<NavLink to='void' as='span' onClick={signOutUser}>SignOut</NavLink>):
            ( <NavLink to='/auth'>
            SignIn
          </NavLink>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}
export default Navigation;