import { Outlet } from 'react-router-dom';
import {Fragment, useContext} from 'react';
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {UserContext} from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import {signOutUser} from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = ()=>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
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
            currentUser ? (<NavLink as='span' onClick={signOutUser}>SignOut</NavLink>):
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