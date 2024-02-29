import React from "react";
import { useContext } from "react";
import CartContext from "../Store/CartContext";
import UserProgressContext from "../Store/UserProgressContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "./Util/Formatting";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart () {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx?.items?.reduce((totalPrice,item) => totalPrice + item.quantity * item.price, 0 )

     function cartCloseHandler(){
        userProgressCtx.hideCart()
     }

     function handleGoToCheckout(){
        userProgressCtx.showCheckout()
     }

    return(
   <Modal className= "cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart" ? cartCloseHandler : null}>
    <h2>Your Cart</h2>
    <ul>
    {cartCtx?.items?.map((item)=> (
            <CartItem key ={item?.id} name= {item.name} quantity ={item.quantity} price ={item.price} onIncrease ={()=> cartCtx.addItem(item)} onDecrease ={()=> cartCtx.removeItem(item.id)}  />
        ))}
    </ul>
       
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
   <p className="modal-actions">
    <Button onClick ={cartCloseHandler}>Close</Button>
   {cartCtx.items.length > 0 && (<Button onClick = {handleGoToCheckout}>Go to Checkout</Button>)}
   </p>
   </Modal>
    )
}

