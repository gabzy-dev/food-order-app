import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "./Util/Formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserProgressContext";
import useHttp from "../Hooks/useHttp";
import Error from "./Error.jsx";



const requestConfig = {
    method: "POST",
    headers:{
        "content-type" : "application/json"
    }
};

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const {data,isLoading:isSending,error,sendRequest,clearData} = useHttp("http://localhost:3000/orders",requestConfig)
   
 const cartTotal = cartCtx?.items?.reduce((totalPrice,item) => totalPrice + item.quantity * item.price, 0 )
  const userProgressCtx = useContext(UserProgressContext);

  function handleClose (){
    userProgressCtx.hideCheckOut();
  }

  function handleFinish(){
    userProgressCtx.hideCheckOut()
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
   event.preventDefault();
   const fd = new FormData(event.target);
   const customerData = Object.fromEntries(fd.entries());
   sendRequest(JSON.stringify({
    order: {
        items: cartCtx.items,
        customer: customerData
    }
}))

  }

  let actions = (
    <>
    <Button type ="button" textOnly onClick ={handleClose}>Close</Button>
                        <Button>Submit Order</Button>
                        
    </>
    );
    
    if(isSending){
        actions = <span>sending order data...</span>
    };

if(data && !error){
return(
    <Modal className="checkoutModal" onClose={handleFinish} open={userProgressCtx.progress=== "checkout"}>
   <h2>success!</h2>
   <p>your order was submitted successfully.</p>
   <p>we will get back to you via email shortly,</p>

<p className="modal-actions">
  <Button onClick ={handleFinish}>okay</Button>
</p>

    </Modal>
)
}

    return(
        <Modal onClose={handleClose} open={userProgressCtx.progress=== "checkout"}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>
                <Input label="full-name" type = "text" id="name"/>
                <Input label="E-mail Address" type = "email" id="email"/>
                <Input label="Street" type = "text" id="street"/>
                <div className="control-row">
                <Input label="Postal-Code" type = "text" id="postal-code"/>
                <Input label="City" type = "text" id="city"/>
                </div>
              {error && <Error title = "failed to submit order" message={error}/>}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}