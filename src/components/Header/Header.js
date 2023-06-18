import React, { useContext } from "react";

import classes from "./Header.module.css";
import mealsTable from "../../assests/mealsTable.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <span>React Meals</span>
        <span>
          <HeaderCartButton onClick={props.onShowCart} />
        </span>
      </header>
      <div className={classes["main-img"]}>
        <img src={mealsTable} />
      </div>
    </React.Fragment>
  );
};

export default Header;
