import React, { useReducer } from "react";

import CartContext from "./cart-context";

//Cart Reducer
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  //add an item
  if (action.type === "add") {
    const existedItemIndex = state.items.findIndex((item) => {
      return item.id === action.value.id;
    });

    const existedItem = state.items[existedItemIndex];

    let newItem;
    let newItems;

    if (existedItem) {
      newItem = {
        ...existedItem,
        amount: existedItem.amount + action.value.amount,
      };
      newItems = [...state.items];
      newItems[existedItemIndex] = newItem;
    } else {
      newItems = state.items.concat(action.value);
    }

    const totalAmount =
      state.totalAmount + action.value.price * action.value.amount;
    return {
      items: newItems,
      totalAmount: totalAmount,
    };
  }

  // remove an item
  if (action.type === "remove") {
    const existedItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });

    const existedItem = state.items[existedItemIndex];

    let newItem;
    let newItems;
    if (existedItem) {
      if (existedItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        newItem = { ...existedItem, amount: existedItem.amount - 1 };
        newItems = [...state.items];
        newItems[existedItemIndex] = newItem;
      }
    }

    const totalAmount = state.totalAmount - existedItem.price;

    return {
      items: newItems,
      totalAmount: totalAmount,
    };
  }
  if (action.type === "clear") {
    return defaultCartState;
  }
  return defaultCartState;
};

//Cart Provider
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //Cart context
  const addItemHandler = (item) => {
    dispatchCartAction({ type: "add", value: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "remove", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "clear" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
