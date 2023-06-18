import React, { useRef } from "react";

import classes from "./InputForm.module.css";
import Input from "../../UI/Input";

const InputForm = (props) => {
  const inputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const amount = inputRef.current.value;
    const amountNumber = +amount;
    props.enteredAmount(amountNumber);
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: 1,
          max: 5,
          defaultValue: 1,
        }}
      />
      <button type="submit" className={classes["add-btn"]}>
        +Add
      </button>
    </form>
  );
};
export default InputForm;
