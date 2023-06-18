import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Order from "./Ordering/Order";
import UserDetailsForm from "./Ordering/UserDetailsForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderProcessing, setOrderProcessing] = useState(false); // display form
  const [checkingOut, setCheckingOut] = useState(false); // Order Confirmed
  const [usersData, setUsersData] = useState(null);
  const [postOrderMsg, setPostOrderMsg] = useState();

  let canOrder = true;

  if (cartCtx.items.length === 0) {
    canOrder = false;
  }

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const itemsList = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onAddItem={addItemHandler.bind(null, item)}
      onRemoveItem={removeItemHandler.bind(null, item.id)}
    />
  ));

  const orderProcess = () => {
    setOrderProcessing(true);
  };
  const checkingOutHandler = (userData) => {
    setUsersData(userData);
    setCheckingOut(true);
  };
  const orderPlacementHandler = (value) => {
    setPostOrderMsg(value);

    cartCtx.clearCart();
  };

  // buttons
  const mainFormControls = (
    <div className={classes["cart-btns"]}>
      <button
        className={classes["close-btn"] + " " + classes.btn}
        onClick={props.onHideCart}
      >
        Close
      </button>
      {canOrder && (
        <button
          className={classes["order-btn"] + " " + classes.btn}
          onClick={orderProcess}
        >
          Order
        </button>
      )}
    </div>
  );

  // main Cart Content
  const modalCartContent = (
    <React.Fragment>
      <ul>{itemsList}</ul>

      <div className={classes["order-total"]}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHideCart}>
      <Card className={classes.cart}>
        {!postOrderMsg && modalCartContent}

        {orderProcessing && !postOrderMsg && (
          <UserDetailsForm
            onClose={props.onHideCart}
            onCheckingOut={checkingOutHandler}
          />
        )}

        {!orderProcessing && mainFormControls}

        {checkingOut && (
          <Order usersData={usersData} onOrderPlace={orderPlacementHandler} />
        )}

        {postOrderMsg && (
          <div className={classes["checkout-feedback"]}>
            <p>{postOrderMsg} </p>
            <button
              className={classes["checkout-btn"]}
              onClick={props.onHideCart}
            >
              Ok
            </button>
          </div>
        )}
      </Card>
    </Modal>
  );
};

export default Cart;
