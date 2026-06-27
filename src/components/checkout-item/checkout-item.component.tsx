import { FC, memo } from 'react';
import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
    cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();

    const addItemHandler = () => dispatch(addItemToCart(cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
    
    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={`${imageUrl}`} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>           
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan className='price'>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
})
export default CheckoutItem;