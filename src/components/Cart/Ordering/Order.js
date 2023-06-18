import { useEffect, useContext } from "react";

import useHttp from "../../../hooks/use-http";
import CartContext from "../../../store/cart-context";

const Order = (props) => {
  const ctx = useContext(CartContext);

  const { commDB: sendData, isLoading: isSending, error } = useHttp();
  if (isSending) {
    props.onOrderPlace("Placing your order.....");
  }
  if (error) {
    props.onOrderPlace(error);
  }
  const postRequest = (data) => {
    console.log(data);
    if (data) {
      props.onOrderPlace("Your Order is successfull.");
    }
  };

  useEffect(() => {
    sendData(
      {
        url: "https://movies-cc0e3-default-rtdb.firebaseio.com/orders.json",
        body: { userDetails: props.usersData, orderDetails: ctx },
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      postRequest
    );
  }, [sendData]);
};

export default Order;
