import { useContext } from 'react'
import React from 'react'
import Button from './UI/Button'
import logoImg from "../assets/logo.jpg"
import CartContext from '../Store/CartContext'
import UserProgressContext from '../Store/UserProgressContext'


const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems + item.quantity;
  },0);

  function handleShowCart(){
    userProgressCtx.showCart();
  }

  return (
   <header id='main-header'>
    <div id='title'>
        <img src= {logoImg} alt='A restaurant'/>
        <h1>Gabzys food order</h1>
    </div>
    <nav>
       <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
    </nav>

   </header>
  )
}

export default Header
