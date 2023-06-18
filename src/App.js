import React, { useState } from "react";
import { lazy } from "react";

import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartVisibility, setCartVisibility] = useState(false);
  const showCartHandler = () => {
    setCartVisibility(true);
  };
  const hideCartHandler = () => {
    setCartVisibility(false);
  };
  return (
    <div>
      <CartProvider>
        {cartVisibility && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={setCartVisibility} />
        {/* <FetchMeals /> */}
        <Meals />
      </CartProvider>
    </div>
  );
}

export default App;
