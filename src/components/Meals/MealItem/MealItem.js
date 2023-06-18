import React, { useContext } from "react";

import classes from "./MealItem.module.css";
import InputForm from "./InputForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const enteredAmountHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <li className={classes["meal-item"]}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price}</div>
      </div>
      <div>
        <InputForm id={props.id} enteredAmount={enteredAmountHandler} />
      </div>
    </li>
  );
};

export default MealItem;
