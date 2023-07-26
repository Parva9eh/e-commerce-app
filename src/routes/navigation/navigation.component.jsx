import { Link, Outlet } from 'react-router-dom';
import {Fragment, useContext} from 'react';
import './navigation.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {UserContext} from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import {signOutUser} from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = ()=>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  console.log(currentUser);
  return(
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          {
            currentUser ? (<span className='nav-link' onClick={signOutUser}>SignOut</span>):
            ( <Link className='nav-link' to='/auth'>
            SignIn
          </Link>)
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation;