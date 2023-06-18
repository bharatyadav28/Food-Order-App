import { useState } from "react";

import classes from "./UserDetailsForm.module.css";
import useInput from "../../../hooks/use-input";

const isNotEmpty = (value) => {
  return value.trim().length !== 0;
};
const isFiveChar = (value) => {
  return value.trim().length >= 5;
};

const UserDetailsForm = (props) => {
  const {
    inputField: nameInput,
    inputChangeHandler: nameInputChangeHandler,
    inputIsValid: nameInputIsValid,
    inputHasError: nameInputHasError,
    blurHandler: nameInputBlurHandler,
    inputClass: nameInputClass,
  } = useInput(isNotEmpty);

  const {
    inputField: cityInput,
    inputChangeHandler: cityInputChangeHandler,
    inputIsValid: cityInputIsValid,
    inputHasError: cityInputHasError,
    blurHandler: cityInputBlurHandler,
    inputClass: cityInputClass,
  } = useInput(isNotEmpty);

  const {
    inputField: pinCodeInput,
    inputChangeHandler: pinCodeChangeHandler,
    inputIsValid: pinCodeIsValid,
    inputHasError: pinCodeHasError,
    blurHandler: pinCodeBlurHandler,
    inputClass: pinCodeInputClass,
  } = useInput(isFiveChar);

  const {
    inputField: streetInput,
    inputChangeHandler: streetInputChangeHandler,
    inputIsValid: streetInputIsValid,
    inputHasError: streetInputHasError,
    blurHandler: streetInputBlurHandler,
    inputClass: streetInputClass,
  } = useInput(isNotEmpty);

  const UserDetailsSubmitHandler = (events) => {
    events.preventDefault();
    nameInputBlurHandler();
    cityInputBlurHandler();
    pinCodeBlurHandler();
    streetInputBlurHandler();

    let formValidity = nameInput && cityInput && pinCodeInput && streetInput;
    if (!formValidity) {
      return;
    }

    props.onCheckingOut({
      nameInput,
      cityInput,
      pinCodeInput,
      streetInput,
    });
  };

  return (
    <form
      onSubmit={UserDetailsSubmitHandler}
      className={classes["user-form"]}
      autoComplete="off"
    >
      <div className={nameInputClass}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && <p>Name can't be empty.</p>}
      </div>

      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityInputHasError && <p>City can't be empty.</p>}
      </div>

      <div className={pinCodeInputClass}>
        <label htmlFor="pin-code">Pin Code</label>
        <input
          type="text"
          id="pin-code"
          onChange={pinCodeChangeHandler}
          onBlur={pinCodeBlurHandler}
        />
        {pinCodeHasError && <p>PinCode is not valid.</p>}
      </div>

      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetInputHasError && <p>Street can't be empty.</p>}
      </div>

      <div className={classes["form-actions"]}>
        <button className={classes.cancel} onClick={props.onClose}>
          Cancel
        </button>
        <button type="submit" className={classes.confirm}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default UserDetailsForm;

//Component
// const UserDetailsForm = (props) => {};
// const [nameInput, setNameInput] = useState("");
// const [cityInput, setcityInput] = useState("");
// const [pinCodeInput, setPinCodeInput] = useState("");
// const [streetInput, setStreetInput] = useState("");

// const [isFormValid, setIsFormValid] = useState({
//   nameInput: true,
//   cityInput: true,
//   pinCode: true,
//   street: true,
// });

// const nameInputRef = useRef();
// const cityInputRef = useRef();
// const pinCodeInputRef = useRef();
// const streetInputRef = useRef();

// const onUserDetailsSubmitHandler = (events) => {
//   events.preventDefault();
//   let formValidValue = {
//     nameInput: !isEmpty(nameInputRef.current.value),
//     cityInput: !isEmpty(cityInputRef.current.value),
//     pinCode: isFiveChar(pinCodeInputRef.current.value),
//     street: !isEmpty(streetInputRef.current.value),
//   };
//   setIsFormValid(formValidValue);
//   let formValidity =
//     formValidValue.nameInput &&
//     formValidValue.cityInput &&
//     formValidValue.pinCode &&
//     formValidValue.street;
//   if (!formValidity) {
//     return;
//   }

//   props.onCheckingOut({
//     nameInput: nameInputRef.current.value,
//     cityInput: cityInputRef.current.value,
//     pinCode: pinCodeInputRef.current.value,
//     street: streetInputRef.current.value,
//   });
// };

// const nameInputClass = `${classes["form-control"]} ${
//   !isFormValid.nameInput ? classes.invalid : ""
// }`;
// const cityInputClass = `${classes["form-control"]} ${
//   !isFormValid.cityInput ? classes.invalid : ""
// }`;
// const pinCodeClass = `${classes["form-control"]} ${
//   !isFormValid.pinCode ? classes.invalid : ""
// }`;
// const streetClass = `${classes["form-control"]} ${
//   !isFormValid.street ? classes.invalid : ""
// }`;

// const onUserDetailsSubmitHandler = (events) => {
//   events.preventDefault();
// }
// ;
// return (
//   <form
//     onSubmit={onUserDetailsSubmitHandler}
//     className={classes["user-form"]}
//     autoComplete="off"
//   >

//     {/* <div className={nameInputClass}>
//       <label htmlFor="name">Full Name</label>
//       <input ref={nameInputRef} type="text" id="name" />
//       {!isFormValid.nameInput && <p>Name can't be empty.</p>}
//     </div> */}
//     {/* <div className={cityInputClass}>
//       <label htmlFor="city">City</label>
//       <input ref={cityInputRef} type="text" id="city" />
//       {!isFormValid.cityInput && <p>City can't be empty.</p>}
//     </div>
//     <div className={pinCodeClass}>
//       <label htmlFor="pin-code">Pin Code</label>
//       <input ref={pinCodeInputRef} type="text" id="pin-code" />
//       {!isFormValid.pinCode && <p>PinCode is not valid.</p>}
//     </div>
//     <div className={streetClass}>
//       <label htmlFor="street">Street</label>
//       <input ref={streetInputRef} type="text" id="street" />
//       {!isFormValid.street && <p>Street can't be empty.</p>}
//     </div> */}

// );
