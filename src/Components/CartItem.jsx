import React from 'react'
import { currencyFormatter } from './Util/Formatting'
import CartContext from '../Store/CartContext'
import { useContext } from 'react'

export default function CartItem({name,quantity,price,onDecrease,onIncrease}){

  const cartCtx = useContext(CartContext);


    return(
        <ul>
             <li className='cart-item'>
            <p>
               {name} -{quantity} x {currencyFormatter.format(price)}
            </p>
            <p className='cart-item-actions'>
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
            
        </ul>
       
    )
};