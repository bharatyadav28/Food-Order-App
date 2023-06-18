import { useState } from "react";

import classes from "../components/Cart/Ordering/UserDetailsForm.module.css";

const useInput = (isvalid) => {
  const [inputField, setInputField] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = isvalid(inputField);
  const inputHasError = !inputIsValid && inputTouched;

  const inputClass = `${classes["form-control"]} ${
    inputHasError ? classes.invalid : ""
  }`;

  const inputChangeHandler = (events) => {
    setInputField(events.target.value);
    setInputTouched(true);
  };
  const blurHandler = () => {
    setInputTouched(true);
  };
  return {
    inputField,
    inputChangeHandler,
    inputIsValid,
    inputHasError,
    blurHandler,
    inputClass,
  };
};

export default useInput;
