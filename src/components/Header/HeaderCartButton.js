import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [highlightButton, setHighlightButton] = useState(false);
  const cartctx = useContext(CartContext);
  const items = cartctx.items;

  useEffect(() => {
    setHighlightButton(true);
    const highlightInterval = setTimeout(() => {
      setHighlightButton(false);
    }, 300);
    return () => {
      clearTimeout(highlightInterval);
    };
  }, [items]);

  const noOfItemsInCart = cartctx.items.reduce((currentVal, item) => {
    return currentVal + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${highlightButton && classes.bump}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
